
echo "zipping deploy -> gs://ean-promotion/deploy.zip"
npm run gs

INSTANCES=($(gcloud compute instance-groups managed list-instances --zone asia-northeast1-a instance-group-1 | awk 'FNR > 1 {print $1; }'))
echo "[INSTANCES]: "
for instance in "${LIST[@]}"; do
  echo "X => ${instance}"
done

for instance in "${INSTANCES[@]}"; do
  echo "[START] deploy instance: ${instance}";


  echo "put deploy script -> /tmp/"
  gcloud compute \
    --project "ean-promotion" \
    copy-files \
    --zone "asia-northeast1-a" \
    ./deploy.sh  ${instance}:/tmp/

  echo "excuting deploy script"
  gcloud compute \
     --project "ean-promotion" \
     ssh \
     --zone "asia-northeast1-a" \
       ${instance} -- "sh /tmp/deploy.sh"

  echo "[DONE] instance: ${instance}"
done
