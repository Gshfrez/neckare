echo "Downloading demo video...";
link="https://zecronai.com/dist/posture/demo.mp4"
wget $link 2>/dev/null || curl -O $link

