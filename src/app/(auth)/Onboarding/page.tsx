'use client'
import React, { useState } from "react";
import { Button, Input, Textarea, Avatar, CircularProgress, Select, SelectItem, CheckboxGroup, Checkbox } from "@nextui-org/react";
import { FaArrowLeft } from "react-icons/fa";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface FormData {
  fullname: string;
  username: string;
  veterinaryClinicName: string;
  veterinaryAddress: string;
  phoneNumber: string;
  ageUserN: number
  ageUser: string;
  experience: string;
  bio: string;
  photoUrl: string;
  openingHours: string;
  closingHours: string;
  experienceN: number;
  [key: string]: string | number;
}


interface ProfileFormProps {
  onNext: () => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

interface ScheduleFormProps {
  onNext: () => void;
  onBack: () => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

interface UploadProfilePictureProps {
  onBack: () => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const Onboarding: React.FC = () => {

  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    fullname: "",
    username: "",
    veterinaryClinicName: "",
    veterinaryAddress: "",
    phoneNumber: "",
    ageUser: "",
    ageUserN: 0,
    experience: "",
    experienceN: 0,
    bio: "",
    photoUrl: "",
    openingHours: "",
    closingHours: "",
  });

  // useEffect(() => {
  //   const checkUserStatus = async () => {
  //     if (user && user.emailAddresses[0].emailAddress) {
  //       try {
  //         const email = user.emailAddresses[0].emailAddress;
  //         const userStatus = await getUserStatus(email);
  //         if (userStatus && userStatus.onboarded) {
  //           router.push('/user/PrincipalPage');
  //         }
  //       } catch (error) {
  //         console.error("Error fetching user status:", error);
  //       }
  //     }
  //   };

  //   checkUserStatus();
  // }, [user, router]);

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center bg-secondary-200">
      <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-4xl h-full m-4 p-8">
        <header className="text-4xl mb-8">
          Pet<span className="text-primary-500">Match</span>
        </header>
        {step === 1 && (
          <ProfileForm
            onNext={handleNextStep}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {step === 2 && (
          <ScheduleForm
            onNext={handleNextStep}
            onBack={handlePreviousStep}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {step === 3 && (
          <UploadProfilePicture
            onBack={handlePreviousStep}
            formData={formData}
            setFormData={setFormData}
          />
        )}
      </div>
    </div>
  );
};

const ProfileForm: React.FC<ProfileFormProps> = ({ onNext, formData, setFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newData = {
        ...prevData,
        [name]: name === 'ageUser' || name === 'experienceN' ? Number(value) : value,
      };
      console.log('Updated formData in ProfileForm:', newData);
      return newData;
    });
  };

  return (
    <div className="flex flex-col gap-8 items-center w-full animate-fadeIn">
      <h1 className="text-4xl font-semibold">Termina de crear tu perfil</h1>
      <form className="flex flex-col gap-5 items-center w-3/4">
        <div className="flex flex-row gap-4 w-full">
          <div className="flex flex-col gap-4 w-full">
            <Input
              type="text"
              label="Nombre"
              name="fullname"
              placeholder="Escribe tu nombre completo"
              variant="bordered"
              className="w-full"
              value={formData.fullname || ''} // Siempre como string
              onChange={handleChange}
            />
            <Input
              type="text"
              label="Nombre de usuario"
              name="username"
              placeholder="Escribe tu nombre de usuario"
              variant="bordered"
              className="w-full"
              value={formData.username || ''} // Siempre como string
              onChange={handleChange}
            />
            <Input
              type="text"
              label="Nombre de la Veterinaria"
              name="veterinaryClinicName"
              placeholder="Escribe el nombre de tu clínica veterinaria"
              variant="bordered"
              className="w-full"
              value={formData.veterinaryClinicName || ''} // Siempre como string
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-4 w-full">
            <Input
              type="text"
              label="Dirección de la Veterinaria"
              name="veterinaryAddress"
              placeholder="Escribe la dirección de tu clínica veterinaria"
              variant="bordered"
              className="w-full"
              value={formData.veterinaryAddress || ''} // Siempre como string
              onChange={handleChange}
            />
            <Input
              type="text"
              label="Número"
              name="phoneNumber"
              variant="bordered"
              placeholder="Escribe tu número"
              className="w-full"
              value={formData.phoneNumber || ''} // Siempre como string
              onChange={handleChange}
            />
            <div className="flex flex-row gap-2 w-full">
              <Input
                type="text"
                label="Edad"
                name="ageUser"
                variant="bordered"
                placeholder="Escribe tu edad"
                className="w-1/2"
                value={formData.ageUser || ''} // Siempre como string
                onChange={handleChange}
              />
              <Select
                variant="bordered"
                label="Experiencia con animales"
                name="experience"
                placeholder="Escribe tu experiencia"
                className="w-1/2"
                value={formData.experience || ''} // Asegúrate de que sea string
                onChange={handleChange}
              >
                <SelectItem key="0">Poca</SelectItem>
                <SelectItem key="0.5">Mediana</SelectItem>
                <SelectItem key="1">Mucha</SelectItem>
              </Select>
            </div>
          </div>
        </div>
        <Textarea
          variant="bordered"
          label="Misión"
          name="bio"
          placeholder="Escribe la misión de tu clínica veterinaria"
          className="w-full"
          value={formData.bio || ''} // Siempre como string
          onChange={handleChange}
        />
        <Button onClick={onNext} className="w-1/2 bg-primary-400 text-white">
          Siguiente
        </Button>
      </form>
    </div>
  );
};


const ScheduleForm: React.FC<ScheduleFormProps> = ({ onNext, onBack, formData, setFormData }) => {
  const [checkboxes, setCheckboxes] = useState<{ [key: string]: boolean }>({
    lunes: false,
    martes: false,
    miércoles: false,
    jueves: false,
    viernes: false,
    sábado: false,
    domingo: false,
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setCheckboxes((prev) => {
      const updatedCheckboxes = {
        ...prev,
        [value]: checked,
      };
      // Actualizar formData solo con días marcados
      setFormData((prevData) => {
        const updatedFormData = { ...prevData };
        if (!checked) {
          // Si el checkbox está desmarcado, eliminar el día del formData
          delete updatedFormData[value];
        }
        console.log('Updated formData in ScheduleForm (Checkbox Change):', updatedFormData);
        return updatedFormData;
      });
      return updatedCheckboxes;
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newData = {
        ...prevData,
        [name]: value,
      };
      console.log('Updated formData in ScheduleForm (Input Change):', newData);
      return newData;
    });
  };

  return (
    <div className="flex flex-col gap-8 items-center w-full animate-fadeIn">
      <h1 className="text-4xl font-semibold">Horario de la clínica veterinaria</h1>
      <form className="flex flex-col gap-5 items-center w-3/4">
        <div className="flex flex-col gap-4 w-full">
          <CheckboxGroup
            label="Selecciona los días disponibles"
          >
            {Object.keys(checkboxes).map((day) => (
              <div key={day} className="flex items-center gap-2 mb-2">
                <Checkbox
                  value={day}
                  className="mr-5"
                  checked={checkboxes[day]}
                  onChange={handleCheckboxChange}
                >
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </Checkbox>
                <Input
                  type="text"
                  name={day}
                  placeholder={`Horario ${day.charAt(0).toUpperCase() + day.slice(1)}`}
                  className="w-1/2 p-1"
                  value={String(formData[day] || '')} 
                  onChange={handleInputChange}
                  disabled={!checkboxes[day]}
                />
              </div>
            ))}
          </CheckboxGroup>
        </div>
        <div className="flex gap-4 w-full mt-6">
          <Button onClick={onBack} className="w-1/2 bg-gray-400 text-white">
            Atrás
          </Button>
          <Button onClick={onNext} className="w-1/2 bg-primary-400 text-white">
            Siguiente
          </Button>
        </div>
      </form>
    </div>
  );
};

const UploadProfilePicture: React.FC<UploadProfilePictureProps> = ({ onBack, formData, setFormData }) => {
  const { user } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleAvatarClick = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        if (file.size > 8 * 1024 * 1024 || !file.type.startsWith("image/")) {
          alert("El archivo debe ser una imagen y no superar los 8MB");
          return;
        }
        const localUrl = URL.createObjectURL(file);
        setFormData((prevData) => ({
          ...prevData,
          photoUrl: localUrl, // URL local de la imagen seleccionada
        }));
      }
    };
    fileInput.click();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('Final formData before submission:', formData);

    try {
      if (!formData.photoUrl) throw new Error("La URL de la imagen es nula. No se puede subir.");

      const response = await fetch(formData.photoUrl);
      const blob = await response.blob();
      const imageFormData = new FormData();
      imageFormData.append("image", blob, "image.jpg");

      // Primera solicitud para insertar en el bucket de AWS
      const uploadResponse = await fetch("/api/uploadImage", {
        method: "POST",
        body: imageFormData,
      });

      if (!uploadResponse.ok) throw new Error(`Error al subir la imagen. Estado: ${uploadResponse.status}`);

      const data = await uploadResponse.json();

      // Segunda solicitud para insertar en la base de datos
      formData.ageUserN = parseFloat(formData.ageUser);
      formData.experienceN = parseFloat(formData.experience);
      const postFormData = {
        ...formData,
        photoUrl: data.url, // Se asegura que `photoUrl` sea la URL final de la imagen
        email: user?.primaryEmailAddress?.emailAddress,
      };

      const postResponse = await fetch(`/api/auth/onboarding?email=${user?.primaryEmailAddress?.emailAddress}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postFormData),
      });

      const resBody = await postResponse.json();
      if (resBody.code !== 201) throw new Error(`Error al enviar los datos: ${resBody.message}`);

      router.push('/user/PrincipalPage');
    } catch (error) {
      console.error("Error en el proceso de submit:", error);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center w-full animate-fadeIn">
      <h1 className="text-xl font-semibold">Sube tu foto de perfil</h1>
      <div className="flex flex-col gap-8 items-center w-full">
        <Avatar
          src={formData.photoUrl || "https://i.pravatar.cc/150?u=a04258114e29026708c"}
          className="w-60 h-60 text-large cursor-pointer"
          onClick={handleAvatarClick}
        />
        <Button
          type="submit"
          className="bg-success-400 font-bold w-1/2"
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress aria-label="Loading..." />
          ) : (
            "Finalizar"
          )}
        </Button>
      </div>
      <div className="w-full justify-start mt-28">
        <Button onClick={onBack} className="bg-transparent text-primary-500 justify-center hover:bg-primary-400 hover:text-white">
          <FaArrowLeft /> Atrás
        </Button>
      </div>
    </form>
  );
};




export default Onboarding;
