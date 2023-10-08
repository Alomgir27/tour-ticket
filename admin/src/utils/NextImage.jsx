import React, { useEffect, useState } from "react";
import Image from "next/image";

const NextImage = ({ src, alt, width, height, ...rest }) => {
    const [image, setImage] = useState(null);
    
    useEffect(() => {
        if (src) {
            const loader = async () => {
                await fetch(`${process.env.NEXT_PUBLIC_API_URL}/image?src=${src}`)
                    .then((res) => {
                        setImage(res);
                    })
                    .catch((err) => {
                        console.log("err", err);
                    });
            };
            loader();
        }
       
    }, [src]);
  

    return (
        <div>
            {image && (
                <Image
                    src={image?.url}
                    alt={alt}
                    width={width ? width : 100}
                    height={height ? height : 100}
                    {...rest}
                />
            )}
        </div>
    );
}


export default NextImage;