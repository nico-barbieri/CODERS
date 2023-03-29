import { useState, useEffect, useRef } from 'react';

/* const usePreloader = (images) => {
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const loadedImages = useRef([]);

  useEffect(() => {
    const loadImages = async () => {
      for (let i = 0; i < images.length; i++) {
        const image = new Image();
        image.src = images[i];

        await new Promise((resolve, reject) => {
          image.onload = () => {
            console.log('loaded:' + images[i]);
            loadedImages.current[i] = image;
            if (loadedImages.current.length === images.length) {
              setAllImagesLoaded(true);
            }
            resolve();
          };
          image.onerror = (error) => {
            console.log(images[i]);
            reject(error)
          };
        });
      }
    };

    loadImages();
  }, [images]);

  return allImagesLoaded;
}; */

const usePreloader = (urls) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log('loading resources...');

    const promises = urls.map((url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = url;
      });
    });

    Promise.all(promises)
      .then(() => {
        setLoaded(true);
      })
      .catch((error) => {
        console.log('Error loading images:', error);
      });
  }, [urls]);

  return loaded;
};


export default usePreloader;
