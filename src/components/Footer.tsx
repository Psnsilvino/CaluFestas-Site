import React from "react";
import instagram1 from '../assets/foto 13.jpg';
import instagram2 from '../assets/foto 11.jpg';
import instagram3 from '../assets/foto 12.jpg';

const Footer: React.FC = () => {
  return (
    <footer>
      {/* Informações */}
      <div className="bg-blue-900 text-white w-full py-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">CaLu Festas e Eventos</h3>
            <p>Organizamos eventos inesquecíveis! Entre em contato para transformar seu sonho em realidade.</p>
            <p>📞 Telefone: (11) 1234-5678</p>
            <p>
              📸:{" "}
              <a
                href="https://www.instagram.com/calu_conceitos?utm_source=ig_web_button_share_sheet&igshid=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                @calu_conceitos
              </a>
            </p>
          </div>
          <div>
            <a
              href="https://www.instagram.com/calu_conceitos?utm_source=ig_web_button_share_sheet&igshid=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className="text-xl font-bold mb-4">Instagram</h3>
            </a>
            <div className="grid grid-cols-3 gap-4">
              <img src={instagram1} alt="Instagram 1" className="w-full h-auto rounded-md" />
              <img src={instagram2} alt="Instagram 2" className="w-full h-auto rounded-md" />
              <img src={instagram3} alt="Instagram 3" className="w-full h-auto rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;