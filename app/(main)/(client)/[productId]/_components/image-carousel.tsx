import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Prisma } from "@prisma/client";
import Image from "next/image";

interface ImageCarouselProps {
  images?: Prisma.JsonValue;
}

function ImageCarousel({ images }: ImageCarouselProps) {
  let imagesArray = images as Prisma.JsonArray;

  return (
    <Carousel className="w-full max-[350px]:max-w-xs max-w-sm sm:max-w-lg">
      <CarouselContent>
        {imagesArray?.map((image, index) => (
          <CarouselItem key={index}>
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6 w-full">
                <Image
                  alt="laptop"
                  src={
                    //@ts-ignore
                    image?.url || ""
                  }
                  height={600}
                  width={600}
                  className="w-full max-w-[616px]"
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default ImageCarousel;
