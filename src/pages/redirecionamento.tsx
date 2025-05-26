import React from 'react';
import NavBar from '../components/NavBar';
const Redirecionamento: React.FC = () => {
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-white p-6 md:p-10 font-sans">
        <div className="flex flex-col md:flex-row md:gap-28 gap-10 max-w-7xl mx-auto px-4 md:px-0 justify-between">
          
          
          <div className="flex flex-col items-center justify-center w-full text-center">
            <h1 className="text-2xl font-medium text-gray-900 mb-6">Tudo certo!</h1>

            {/* imagem */}
            <div className="flex items-center justify-center mb-6">
                <img
                    src="/Check.svg"
                    alt="Ícone de confirmação"
                    className="w-[384px] h-[384px] object-contain"
                    
                />
            </div>
            {/* <div className="w-40 h-40 mb-6">
              <img
                src="/greencheck.png"
                alt="Ícone de confirmação"
                className="w-full h-full object-contain"
              />
            </div> */}

            {/* Texto de redirecionamento */}
            <p className="text-lg text-black max-w-md">
              Sua locação está sendo processada e você será redirecionado para o WhatsApp
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Redirecionamento;
