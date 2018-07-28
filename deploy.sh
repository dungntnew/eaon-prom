gsutil cp gs://ean-promotion/deploy.zip deploy.zip
unzip -o deploy.zip

DIR="/usr/share/nginx/virtualhost/aeon-promotion"
TARGET="$DIR/deploy"
UPLOADDIR="$DIR/uploads"
sudo mkdir -pv "$DIR"
sudo mkdir -pv "$UPLOADDIR"

sudo rm -rfv "$TARGET"

NAME=`date  "+%Y%m%d%H%M%S"`
sudo mv -v deploy "$DIR/$NAME"
sudo ln -sv "$DIR/$NAME"  "$TARGET"
sudo chcon -v -R -t httpd_sys_rw_content_t "$DIR/$NAME"
sudo chcon -v -R -t httpd_sys_rw_content_t "$TARGET"
sudo chcon -v -R -t httpd_sys_rw_content_t "$UPLOADDIR"
sudo chmod -v 777 "$UPLOADDIR"
sudo ls -la "$DIR"
