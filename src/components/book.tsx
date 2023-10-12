import React, { ReactElement } from "react";
import Image from "next/image";

const Book = (): ReactElement => {
  //---This is just example data. Later, this data will be pulled from Redux store
  let image = "";
  image =
    "https://prodimage.images-bn.com/lf?set=key%5Bresolve.pixelRatio%5D,value%5B1%5D&set=key%5Bresolve.width%5D,value%5B600%5D&set=key%5Bresolve.height%5D,value%5B10000%5D&set=key%5Bresolve.imageFit%5D,value%5Bcontainerwidth%5D&set=key%5Bresolve.allowImageUpscaling%5D,value%5B0%5D&set=key%5Bresolve.format%5D,value%5Bwebp%5D&source=url%5Bhttps://prodimage.images-bn.com/pimages/9780547928210_p0_v4_s600x595.jpg%5D&scale=options%5Blimit%5D,size%5B600x10000%5D&sink=format%5Bwebp%5D";
  const title = "The Lord of The Rings";
  const author = "J.R.R Tolkien";
  const page = 75;
  const totalPageCount = 200;
  const stars = 4;
  //----

  const starsArray: ReactElement[] = [];
  for (let i = 0; i < 5; i++) {
    starsArray.push(
      <div className="relative md:w-8 md:h-8 w-5 h-5">
        <Image
          src={i < stars ? "/star.svg" : "/emptyStar.svg"}
          fill
          alt="star"
          sizes=""
        />
      </div>
    );
  }

  return (
    <div
      className="w-[90vw] h-[35vw] lg:w-[950px] lg:h-[370px] xl:w-[1150px] xl:h-[470px]"
      key={crypto.randomUUID()}>
      
      <div className="flex w-[100%] h-[100%] gap-10">
        <div className="relative bg-gray w-[25%] h-[100%] rounded-xl">
          {image !== "" ? (
            <Image
              className="rounded-xl object-cover overflow-hidden"
              placeholder="empty"
              alt={`Image of ${title} cover`}
              src={image}
              fill
              sizes="1"
              priority
            />
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col justify-between sm:pb-10 pb-3">
          <div className="flex flex-col sm:gap-5 gap-1">
            <h2 className="text-2xl sm:text-4xl font-bold">{title}</h2>
            <p>by {author}</p>
            <div className="flex gap-3">{starsArray}</div>
          </div>
          {`${Math.floor((page / totalPageCount) * 100)}% Complete`}
        </div>
      </div>

      <div className="rounded-full bg-gradient-to-br from-pink to-orange w-[100%] h-3 sm:mt-5 mt-2"></div>
    </div>
  );
};

export default Book;
