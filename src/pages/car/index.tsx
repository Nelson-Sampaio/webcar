import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { Container } from "../../components/container";
import { db } from "../../services/firebaseConnection";

// Importe os estilos do Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

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
  const navigate = useNavigate();
  const [sliderPerView, setSliderPerView] = useState<number>(2);

  useEffect(() => {
    async function loadCar() {
      if (!id) {
        return;
      }
      const docRef = doc(db, "cars", id);
      getDoc(docRef).then((snapshot) => {
        if (!snapshot.exists()) {
          navigate("/");
        }

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
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Container>
      {car && (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={sliderPerView}
          spaceBetween={30}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          className="mySwiper"
        >
          {car.images.map((image) => (
            <SwiperSlide key={image.name}>
              <div className="flex items-center justify-center h-96">
                <img 
                  src={image.url} 
                  alt={`Imagem do carro ${car.name}`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {car && (
        <main className="w-full p-6 my-4 bg-white rounded-lg">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
            <h1 className="font-bold text-3xl text-black">{car.name}</h1>
            <h1 className="font-bold text-3xl text-black">R$ {car.price}</h1>
          </div>

          <p className="text-gray-600 mb-4">{car.model}</p>
          
          <div className="w-full flex gap-6 my-4">
            <div className="w-full flex flex-col gap-4">
              <div>
                <p className="text-gray-500">Cidade</p>
                <strong className="text-lg">{car.city}</strong>
              </div>
              <div className="flex items-center gap-6">
                <p className="text-gray-500">Ano</p>
                <strong className="text-lg">{car.year}</strong>
              </div>
              <div className="flex items-center gap-6">
                <p className="text-gray-500">KM</p>
                <strong className="text-lg">{car.km}</strong>
              </div>
            </div>
          </div>

          <strong className="text-xl block mb-2">Descrição</strong>
          <p className="mb-6 text-gray-700">{car.description}</p>

          <strong className="text-xl block mb-2">Telefone/Whatsapp</strong>
          <p className="mb-4">{car.whatsapp}</p>

          <a
            href={`https://api.whatsapp.com/send?phone=${car.whatsapp}&text=Olá, vi seu anúncio do ${car.name} (${car.model}) no WebCarros e gostaria de mais informações!`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 h-11 my-6 font-medium text-xl text-white bg-green-500 hover:bg-green-600 transition-colors cursor-pointer rounded-xl"
          >
            Falar com o vendedor
            <FaWhatsapp size={26} color="#fff" />
          </a>
        </main>
      )}
    </Container>
  );
}