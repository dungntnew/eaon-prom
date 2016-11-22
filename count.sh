
DAYS=("20161121" "20161122")

for day in "${DAYS[@]}"; do
  INSTANCES=($(gcloud compute instance-groups managed list-instances --zone asia-northeast1-a instance-group-1 | awk 'FNR > 1 {print $1; }'))
  echo "[INSTANCES]: "
  TOTAL=0
  for instance in "${INSTANCES[@]}"; do
    echo "X => ${instance}"
    COUNT=`gcloud compute ssh "${instance}" --zone asia-northeast1-a  -- "zcat  /var/log/nginx/access.log-${day}.gz | grep main.541a2155.css  | wc -l"`
    echo "DAY: ${day} - ${COUNT}"
    TOTAL=$(($TOTAL + $COUNT))
  done
  echo "TOTAL: ${TOTAL}"
done
