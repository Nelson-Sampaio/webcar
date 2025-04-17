import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { Swiper, SwiperSlide } from "swiper/react";

import { Container } from "../../components/container";
import { db } from "../../services/firebaseConnection";

interface ImageCarProps {
  uid: string;
  name: string;
  url: string;
}

interface CarProps {
  id: string;
  name: string;
  model: string;
  city: string;
  year: string;
  km: string;
  description: string;
  created: string;
  price: string | number;
  owner: string;
  uid: string;
  whatsapp: string;
  images: ImageCarProps[];
}

export function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState<CarProps>();

  const [sliderPerView, setSliderPerView] = useState<number>(2);

  useEffect(() => {
    async function loadCar() {
      if (!id) {
        return;
      }
      const docRef = doc(db, "cars", id);
      getDoc(docRef).then((snapshot) => {
        setCar({
          id: snapshot.id,
          name: snapshot.data()?.name,
          model: snapshot.data()?.model,
          city: snapshot.data()?.city,
          year: snapshot.data()?.year,
          km: snapshot.data()?.km,
          description: snapshot.data()?.description,
          created: snapshot.data()?.created,
          price: snapshot.data()?.price,
          owner: snapshot.data()?.owner,
          uid: snapshot.data()?.uid,
          whatsapp: snapshot.data()?.whatsapp,
          images: snapshot.data()?.images,
        });
      });
    }
    loadCar();
  }, [id]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 720) {
        setSliderPerView(1);
      } else {
        setSliderPerView(2);
      }
    }
    handleResize();

    window.addEventListener("resize", handleResize);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Container>
      <Swiper
        slidesPerView={sliderPerView}
        pagination={{ clickable: true }}
        navigation
      >
        {car?.images.map((image) => (
          <SwiperSlide key={image.name}>
            <img
              className="w-full h-96 object-cover"
              src={image.url}
              alt={image.name}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {car && (
        <main className="w-full p-6 my-4 bg-white rounded-lg">
          // Campo que informa o nome e o valor do Veiculo
          <div className="flex flex-col sm:flex-row items-center justify-betweenmb-4 ">
            <h1 className="font-bold text-3xl text-black">{car?.name}</h1>
            <h1 className="font-bold text-3xl text-black"> R$ {car?.price}</h1>
          </div>
          // Campo que informa o modelo e versões do veiculo
          <p>{car?.model}</p>
          <div className="w-full flex gap-6 my-4">
            <div className="w-full flex-col gap-4">
              <div>
                <p>Cidade</p>
                <strong>{car?.city}</strong>
              </div>
              <div className="w-full flex gap-6 my-4">
                <p>Ano</p>
                <strong>{car?.year}</strong>
              </div>
              <div className="w-full flex gap-6 my-4">
                <p>KM</p>
                <strong>{car?.km}</strong>
              </div>
            </div>
          </div>
          <strong>Descrição</strong>
          <p className="mb-4">{car?.description}</p>
          <strong>Telefone/Whatsapp</strong>
          <p>{car?.whatsapp}</p>
          <a className="w-full flex items-center justify-center gap-2 h-11 my-6 font-mediumtext-xl text-white bg-green-500 cursor-pointer rounded-xl">
            Falar com o vendedor
            <FaWhatsapp size={26} color="#fff" />
          </a>
        </main>
      )}
    </Container>
  );
}
