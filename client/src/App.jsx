import { useState } from 'react';
import './index.css';
import './App.css';

function App() {
  const [screen, setScreen] = useState('welcome');
  
  // Estado para mensajes de alimentación (ej: "¡Ñam!")
  const [feedFeedback, setFeedFeedback] = useState({ show: false, pet: null, text: '' });

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

  // --- LISTA DE ALIMENTOS ---
  const foodItems = [
    { id: 'Carne', icon: '🍖', name: 'Carne' },
    { id: 'Zanahoria', icon: '🥕', name: 'Zanahoria' },
    { id: 'Agua', icon: '💧', name: 'Agua' },
    { id: 'Galleta', icon: '🍪', name: 'Galleta' }
  ];

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

  // --- LÓGICA DE ARRASTRAR Y SOLTAR ---
  
  const handleDragStart = (e, foodName) => {
    e.dataTransfer.setData("foodName", foodName); 
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // ¡Esto permite que se pueda soltar el elemento!
  };

  const handleDrop = (e, petName) => {
    e.preventDefault();
    const foodName = e.dataTransfer.getData("foodName");
    
    // Mostrar mensaje de felicidad
    setFeedFeedback({ show: true, pet: petName, text: `¡Ñam! 😋 (${foodName})` });

    // Ocultar mensaje después de 2 segundos
    setTimeout(() => {
        setFeedFeedback({ show: false, pet: null, text: '' });
    }, 2000);
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

      {/* --- PANTALLA 4: COCINA (KITCHEN) --- */}
      {screen === 'kitchen' && (
        <section id="kitchen-screen" className="screen active">
            <button className="back-btn" onClick={() => setScreen('home')}>⬅ Volver</button>

            <div className="kitchen-floor">
              {/* PERRITO 1 */}
              <div 
                className="pet-container"
                onDragOver={handleDragOver} 
                onDrop={(e) => handleDrop(e, formData.pet1Name)}
              >
                {feedFeedback.show && feedFeedback.pet === formData.pet1Name && (
                    <div className="feedback-bubble">{feedFeedback.text}</div>
                )}
                <img src={getBreedImage(formData.pet1Breed)} alt={formData.pet1Name} className="pet-sprite" />
                <p className="pet-name-tag">{formData.pet1Name}</p>
              </div>

              {/* PERRITO 2 */}
              <div 
                className="pet-container"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, formData.pet2Name)}
              >
                {feedFeedback.show && feedFeedback.pet === formData.pet2Name && (
                    <div className="feedback-bubble">{feedFeedback.text}</div>
                )}
                <img src={getBreedImage(formData.pet2Breed)} alt={formData.pet2Name} className="pet-sprite" />
                <p className="pet-name-tag">{formData.pet2Name}</p>
              </div>
            </div>

            {/* Barra de Comida */}
            <div className="food-bar">
                {foodItems.map((food) => (
                    <div 
                        key={food.id} 
                        className="food-item" 
                        draggable={true} 
                        onDragStart={(e) => handleDragStart(e, food.name)} 
                    >
                        {food.icon}
                    </div>
                ))}
            </div>
        </section>
      )}

      {/* --- OTRAS PANTALLAS --- */}
      {screen === 'bathroom' && (
        <section className="screen active" style={{background: '#d1f2ff', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <h1>🛁 El Baño</h1><p>Próximamente...</p><button className="btn-primary" onClick={() => setScreen('home')}>Volver</button>
        </section>
      )}
      {screen === 'garden' && (
        <section className="screen active" style={{background: '#d1ffdb', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <h1>🌳 El Patio</h1><p>Próximamente...</p><button className="btn-primary" onClick={() => setScreen('home')}>Volver</button>
        </section>
      )}

    </div>
  );
}

export default App;