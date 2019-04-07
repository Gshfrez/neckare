import dlib
import cv2
from imutils import face_utils, video
from sklearn.cluster import KMeans
import numpy as np
font = cv2.FONT_HERSHEY_SIMPLEX

def anonymizer(image, gray):
    rects = detector(gray, 0)
    count = 0
    for (i, rect) in enumerate(rects):
        # Predict keypoints
        shape = predictor(gray, rect)
        shape = face_utils.shape_to_np(shape)

        # Cluster
        group = np.array(shape)
        kmeans = KMeans(n_clusters=4, random_state=0).fit(group)
        
        ppa = [x[0] for x in kmeans.cluster_centers_]
        ppb = [x[1] for x in kmeans.cluster_centers_]

        # Draw cluster on biometric identity zones
        for a, b in zip(ppa, ppb):
            count += 1
            a = int(a)
            b = int(b)
            cv2.circle(image, (a, b), 20, (0, 0, 139), -1)
    return count

def process_video():
    """Process video and handle user commands."""
    # Feed from computer camera with threading
    cap = video.VideoStream(src=0, resolution=(200,150)).start()

    # Define the codec and create VideoWriter object
    fourcc = cv2.VideoWriter_fourcc(*'mp4v') # Be sure to use the lower case
    out = cv2.VideoWriter('output.mp4', fourcc, 20.0, (200, 150))
    while True:
        # Read image, anonymize, and wait for user quit.
        image = cap.read()
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        nb_rects = anonymizer(image, gray)
        image = cv2.convertScaleAbs(image, alpha=1.0, beta=0)
        if nb_rects > 3:
            image = cv2.putText(image,'GOOD',(10,500), font, 5,(255,255,255),4,cv2.LINE_AA)
        else:
            image = cv2.putText(image,'BAD',(10,500), font, 5,(0,0,255),4,cv2.LINE_AA)
        out.write(image)
        cv2.imshow("Realtime Anon", image)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    out.release()
    cv2.destroyAllWindows()
    cap.stop()

predictor = dlib.shape_predictor('model.dat')
detector = dlib.get_frontal_face_detector()
process_video()