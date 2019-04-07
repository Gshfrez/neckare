# posture_Model


## Installation
Run the command "pip3 install -r requirements.txt" for installing all the dependencies"

## Reproductibility
Execute the notebook poseNet.ipynb and follow the instructions

(Optional)
3. In the root directory, place a video file of type mp4 for extracting your own data, and launch the extraction in poseNet.ipynb



## Model explanation
The goal is to predict different human postures, based on camera images. 

## Our approach

We took different videos of us, and extract the corresponding sequence of pictures, and we do the labelisation by hand using a python script.

Our first approach was to use the full images to classify the different postures. But the model takes time to train, and a lot of overfitting was present, even with pre trained model, data augmentation and regularizations techniques. The only solution was to add more images, but we did not have the time for that. The hackathon was only for 24hours.

We decided to take a completely new approach. Instead to train a model based on the RGB images, we decided to train a model based on the output of an existing human pose estimation: [Blog post][https://medium.com/tensorflow/real-time-human-pose-estimation-in-the-browser-with-tensorflow-js-7dd0bc881cd5]


![Example][Example.png]

The idea is that, using 17 2D points instead of a full image, it will be much more difficult for the network to overfit.

This approach can be seen as transfer learning for new classes of human pose estimations.
To our knowledge, we did not see similar techniques in the litterature.

This is the part of our machine learning pipeline that is trainable. Only a linear model on 34 parameters:



### Results

Of course, we compare both results, by looking at the validation loss.
We can in the graphics bellow that see that the convergence of the new model is much faster, and that the val_loss is slower. 

The blue line correspond to our model based on pose estimations, where the other model is based on a pretrained MobileNet.

![Image](val_loss.png)

![Image](val_acc.png)

### PoseNet explanation
PoseNet is an existing network, who tries to predict the 17 basics keypoints of human pose :

![Image](pose_basic.png)


And here is the neural network architecture to predict the 17 keypoints (a mobile net with a heatmap for each keypoint as output):

![Network](network_keypoint.png)