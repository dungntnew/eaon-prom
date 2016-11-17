#!/bin/bash

sudo yum -y groupinstall development

sudo rpm --import http://ftp.riken.jp/Linux/fedora/epel/RPM-GPG-KEY-EPEL-6
sudo rpm -ivh http://ftp.riken.jp/Linux/fedora/epel/6/x86_64/epel-release-6-8.noarch.rpm
sudo yum -y update epel-release
sudo cp -p /etc/yum.repos.d/epel.repo /etc/yum.repos.d/epel.repo.org
sudo sed -i -e "s/enabled=1/enabled=0/g" /etc/yum.repos.d/epel.repo
sudo rpm --import http://rpms.famillecollet.com/RPM-GPG-KEY-remi
sudo rpm -ivh http://rpms.famillecollet.com/enterprise/remi-release-6.rpm
sudo yum -y update remi-release
sudo rpm -ivh http://nginx.org/packages/centos/6/noarch/RPMS/nginx-release-centos-6-0.el6.ngx.noarch.rpm
sudo yum -y update nginx-release-centos
sudo cp -p /etc/yum.repos.d/nginx.repo /etc/yum.repos.d/nginx.repo.org
sudo sed -i -e "s/enabled=1/enabled=0/g" /etc/yum.repos.d/nginx.repo

sudo yum -y --enablerepo=remi-php56,remi,epel install php-fpm php-mbstring php-xml php-mysql php-pdo php-mcrypt php-pecl-memcached php-pecl-msgpack

sudo yum -y --enablerepo=nginx install nginx

sudo cp -p /etc/php.ini /etc/php.ini.org
sudo sed -i -e 's/;date.timezone =/date.timezone = "Asia\/Tokyo"/' /etc/php.ini | grep date.timezone

sudo cp -p /etc/php-fpm.d/www.conf /etc/php-fpm.d/www.conf.org
sudo sed -i -e 's/user = apache/user = nginx/' /etc/php-fpm.d/www.conf
sudo sed -i -e 's/group = apache/group = nginx/' /etc/php-fpm.d/www.conf

sudo mkdir -p /var/log/nginx/log/
sudo chmod 777 /var/log/nginx/log/
touch /var/log/nginx/log/host.access.log
sudo mkdir /etc/nginx/sites-available
sudo mkdir /etc/nginx/sites-enabled
sudo mkdir /usr/share/nginx/virtualhost
sudo chmod 777 /usr/share/nginx/virtualhost
sudo chown nginx:nginx /usr/share/nginx/virtualhost
cat << EOF | sudo tee /usr/share/nginx/virtualhost/index.php
<?php phpinfo();
EOF

sudo cp -p /etc/nginx/nginx.conf /etc/nginx/nginx.conf.org
sudo sed -i -e 's/include \/etc\/nginx\/conf.d\/\*.conf;/include \/etc\/nginx\/conf.d\/\*.conf;\n    include \/etc\/nginx\/sites-enabled\/\*.conf;/' /etc/nginx/nginx.conf
cat << EOF | sudo tee /etc/nginx/sites-available/virtualhost.conf
server {
    listen       80  default_server;
    server_name  _;

    access_log  /var/log/nginx/log/host.access.log  main;

    location / {
        root   /usr/share/nginx/virtualhost/aeon-promotion/build;
        index  index.php index.html index.htm;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    #
    location ~ \.php$ {
        root   /usr/share/nginx/virtualhost/aeon-promotion/build;
        fastcgi_pass   127.0.0.1:9000;
        fastcgi_index  index.php;
        fastcgi_param  SCRIPT_FILENAME  \$document_root\$fastcgi_script_name;
        include        fastcgi_params;
    }

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}
EOF
sudo sudo ln -s /etc/nginx/sites-available/virtualhost.conf /etc/nginx/sites-enabled/

sudo cp -p /etc/sysconfig/iptables /etc/sysconfig/iptables.org
sudo sed -i -e 's/-A INPUT -m state --state NEW -m tcp -p tcp --dport 22 -j ACCEPT/-A INPUT -m state --state NEW -m tcp -p tcp --dport 22 -j ACCEPT\n-A INPUT -m state --state NEW -m tcp -p tcp --dport 80 -j ACCEPT/' /etc/sysconfig/iptables
sudo /etc/rc.d/init.d/iptables restart

sudo /etc/rc.d/init.d/php-fpm start
sudo chkconfig php-fpm on

sudo /etc/rc.d/init.d/nginx start
sudo chkconfig nginx on
