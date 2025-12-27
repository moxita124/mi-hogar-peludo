import { useState } from 'react';
import './index.css';
import './App.css';

function App() {
  const [screen, setScreen] = useState('welcome');

  // --- ESTADO DEL FORMULARIO ---
  const [formData, setFormData] = useState({
    ownerName: '',
    pet1Name: '',
    pet1Breed: '',
    pet2Name: '',
    pet2Breed: ''
  });
  
  // --- LISTA DE RAZAS ---
  const breeds = [
    { id: 'labrador', img: '/razas/labrador.png', name: 'Labrador' },
    { id: 'pug',      img: '/razas/pug.png',      name: 'Pug' }, 
    { id: 'pastor',   img: '/razas/pastor1.png',  name: 'Pastor Alemán' }
  ];

  // Helper para buscar la imagen
  const getBreedImage = (breedId) => {
    const breed = breeds.find(b => b.id === breedId);
    return breed ? breed.img : null;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const selectBreed = (petNumber, breedId) => {
    setFormData({ ...formData, [`pet${petNumber}Breed`]: breedId });
  };

  const handleStart = () => {
    if (!formData.ownerName || !formData.pet1Name || !formData.pet2Name || !formData.pet1Breed || !formData.pet2Breed) {
      alert("¡Por favor completa todos los campos!");
      return;
    }
    setScreen('home'); 
  };

  return (
    <div id="app-container">
      
      {/* --- PANTALLA 1: BIENVENIDA --- */}
      {screen === 'welcome' && (
        <section id="welcome-screen" className="screen active">
          <div className="overlay"></div>
          <div className="content-box">
            <h1>Bienvenido a Casa</h1>
            <p className="subtitle">Donde la amistad crece</p>
            <button className="btn-primary" onClick={() => setScreen('register')}>
              COMENZAR NUESTRA VIDA JUNTOS
            </button>
          </div>
        </section>
      )}

      {/* --- PANTALLA 2: REGISTRO --- */}
      {screen === 'register' && (
         <section id="register-screen" className="screen active">
            <div className="register-card">
              <h2>¡Vamos a conocernos!</h2>
              {/* Formulario simplificado para no ocupar espacio visual aquí */}
              <div className="form-group">
                <label>Tu Nombre:</label>
                <input type="text" name="ownerName" placeholder="¿Cómo te llamas?" value={formData.ownerName} onChange={handleInputChange} />
              </div>
              <div className="pet-section">
                <h3>🐶 Perrito 1</h3>
                <input type="text" name="pet1Name" placeholder="Nombre..." value={formData.pet1Name} onChange={handleInputChange} />
                <div className="breed-options">
                  {breeds.map((breed) => (
                    <div key={breed.id} className={`breed-icon ${formData.pet1Breed === breed.id ? 'selected' : ''}`} onClick={() => selectBreed(1, breed.id)}>
                      <img src={breed.img} alt={breed.name} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="pet-section">
                <h3>🐶 Perrito 2</h3>
                <input type="text" name="pet2Name" placeholder="Nombre..." value={formData.pet2Name} onChange={handleInputChange} />
                <div className="breed-options">
                  {breeds.map((breed) => (
                    <div key={breed.id} className={`breed-icon ${formData.pet2Breed === breed.id ? 'selected' : ''}`} onClick={() => selectBreed(2, breed.id)}>
                       <img src={breed.img} alt={breed.name} />
                    </div>
                  ))}
                </div>
              </div>
              <button className="btn-primary full-width" onClick={handleStart}>¡TODO LISTO! ENTRAR A CASA</button>
            </div>
         </section>
      )}

      {/* --- PANTALLA 3: LA CASA (HUB) --- */}
      {screen === 'home' && (
        <section id="house-screen" className="screen active">
            <div className="house-header">
              <h2>Hola, {formData.ownerName}</h2>
            </div>

            <div className="living-room-floor">
              <div className="pet-container">
                <img src={getBreedImage(formData.pet1Breed)} alt={formData.pet1Name} className="pet-sprite" />
                <p className="pet-name-tag">{formData.pet1Name}</p>
              </div>
              <div className="pet-container">
                <img src={getBreedImage(formData.pet2Breed)} alt={formData.pet2Name} className="pet-sprite" />
                <p className="pet-name-tag">{formData.pet2Name}</p>
              </div>
            </div>
            
            {/* AQUÍ ESTÁ LA LÓGICA DE NAVEGACIÓN */}
            <div className="nav-bar">
                <button className="nav-btn kitchen" onClick={() => setScreen('kitchen')}>
                    🍖 <span className="btn-label">Comer</span>
                </button>
                <button className="nav-btn bathroom" onClick={() => setScreen('bathroom')}>
                    🛁 <span className="btn-label">Bañar</span>
                </button>
                <button className="nav-btn garden" onClick={() => setScreen('garden')}>
                    🎾 <span className="btn-label">Jugar</span>
                </button>
            </div>
        </section>
      )}

      {/* --- PANTALLAS NUEVAS (PROVISIONALES) --- */}
      
      {screen === 'kitchen' && (
        <section className="screen active" style={{background: '#ffecd1', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <h1>🍽️ La Cocina</h1>
            <p>Aquí vendrá la mecánica de comer.</p>
            <button className="btn-primary" onClick={() => setScreen('home')}>Volver a la Sala</button>
        </section>
      )}

      {screen === 'bathroom' && (
        <section className="screen active" style={{background: '#d1f2ff', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <h1>🛁 El Baño</h1>
            <p>Aquí vendrá la mecánica de bañarse.</p>
            <button className="btn-primary" onClick={() => setScreen('home')}>Volver a la Sala</button>
        </section>
      )}

      {screen === 'garden' && (
        <section className="screen active" style={{background: '#d1ffdb', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <h1>🌳 El Patio</h1>
            <p>Aquí vendrá el minijuego.</p>
            <button className="btn-primary" onClick={() => setScreen('home')}>Volver a la Sala</button>
        </section>
      )}

    </div>
  );
}

export default App;