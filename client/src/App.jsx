import { useState } from 'react';
import './index.css';
import './App.css';

function App() {
  const [screen, setScreen] = useState('welcome');
  const [feedFeedback, setFeedFeedback] = useState({ show: false, pet: null, text: '' });
  
  // Estados de minijuegos
  const [petCleanliness, setPetCleanliness] = useState({ pet1: false, pet2: false });
  const [score, setScore] = useState(0); 
  const [isBallThrown, setIsBallThrown] = useState(false);
  const [lightsOn, setLightsOn] = useState(true); 

  // --- NUEVO: ESTADO PARA SELECCIÓN (CLICK/TAP en Celular) ---
  const [selectedItem, setSelectedItem] = useState(null); // { name: 'Carne', type: 'food' }

  // Estados Formulario
  const [formData, setFormData] = useState({
    ownerName: '', pet1Name: '', pet1Breed: '', pet2Name: '', pet2Breed: ''
  });
  
  const breeds = [
    { id: 'labrador', img: '/razas/labrador.png', name: 'Labrador' },
    { id: 'pug',      img: '/razas/pug.png',      name: 'Pug' }, 
    { id: 'pastor',   img: '/razas/pastor1.png',  name: 'Pastor Alemán' }
  ];

  const foodItems = [
    { id: 'Carne', icon: '🍖', name: 'Carne' },
    { id: 'Zanahoria', icon: '🥕', name: 'Zanahoria' },
    { id: 'Agua', icon: '💧', name: 'Agua' },
    { id: 'Galleta', icon: '🍪', name: 'Galleta' }
  ];

  const bathTools = [
    { id: 'Sponge', icon: '🧽', name: 'Esponja' },
    { id: 'Soap', icon: '🧼', name: 'Jabón' }
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
      alert("¡Por favor completa todos los campos!"); return;
    }
    setScreen('home'); 
  };

  // --- LÓGICA DE JUEGO ---
  const throwBall = () => {
    if (isBallThrown) return; 
    setIsBallThrown(true); 
    setTimeout(() => {
        setScore(score + 10); 
        setFeedFeedback({ show: true, pet: 'both', text: '¡Buen tiro! +10' });
        setIsBallThrown(false); 
        setTimeout(() => setFeedFeedback({ show: false, pet: null, text: '' }), 1500);
    }, 1000);
  };

  const toggleLights = () => setLightsOn(!lightsOn);

  // --- LÓGICA HÍBRIDA: DRAG & DROP + CLICK/TAP (Para iPhone) ---

  // 1. Seleccionar item con Click (Para celular)
  const handleItemClick = (itemName, type) => {
    // Si ya estaba seleccionado, lo deseleccionamos
    if (selectedItem && selectedItem.name === itemName) {
        setSelectedItem(null);
    } else {
        setSelectedItem({ name: itemName, type: type });
    }
  };

  // 2. Acción al tocar al perro (Si hay item seleccionado)
  const handlePetClick = (petKey, petName) => {
    if (!selectedItem) return; // Si no hay nada seleccionado, no hace nada

    applyAction(selectedItem.name, selectedItem.type, petKey, petName);
    setSelectedItem(null); // Reseteamos selección después de usarlo
  };

  // 3. Lógica central de acción (Compartida por Click y Drop)
  const applyAction = (itemName, itemType, petKey, petName) => {
    if (itemType === 'food') {
        setFeedFeedback({ show: true, pet: petName, text: `¡Ñam! 😋 (${itemName})` });
        setTimeout(() => setFeedFeedback({ show: false, pet: null, text: '' }), 2000);
    }
    if (itemType === 'tool') {
        if (petCleanliness[petKey] === false) {
            setPetCleanliness({ ...petCleanliness, [petKey]: true }); 
            setFeedFeedback({ show: true, pet: petName, text: `¡Limpio! ✨` });
        } else {
            setFeedFeedback({ show: true, pet: petName, text: `¡Ya estoy limpio! 😄` });
        }
        setTimeout(() => setFeedFeedback({ show: false, pet: null, text: '' }), 2000);
    }
  };

  // 4. Drag Start (Para PC)
  const handleDragStart = (e, itemName, type) => {
    e.dataTransfer.setData("itemName", itemName);
    e.dataTransfer.setData("itemType", type); 
  };
  const handleDragOver = (e) => e.preventDefault();
  
  // 5. Drop (Para PC)
  const handleDrop = (e, petKey, petName) => {
    e.preventDefault();
    const itemName = e.dataTransfer.getData("itemName");
    const itemType = e.dataTransfer.getData("itemType");
    applyAction(itemName, itemType, petKey, petName);
  };

  return (
    <div id="app-container">
      
      {/* PANTALLA BIENVENIDA */}
      {screen === 'welcome' && (
        <section id="welcome-screen" className="screen active">
          <div className="overlay"></div>
          <div className="content-box">
            <h1>Bienvenido a Casa</h1>
            <p className="subtitle">Donde la amistad crece</p>
            <button className="btn-primary" onClick={() => setScreen('register')}>COMENZAR NUESTRA VIDA JUNTOS</button>
          </div>
        </section>
      )}

      {/* PANTALLA REGISTRO */}
      {screen === 'register' && (
         <section id="register-screen" className="screen active">
            <div className="register-card">
              <h2>¡Vamos a conocernos!</h2>
              <div className="form-group">
                <label>Tu Nombre:</label>
                <input type="text" name="ownerName" placeholder="Tu nombre..." value={formData.ownerName} onChange={handleInputChange} />
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
              <button className="btn-primary full-width" onClick={handleStart}>¡TODO LISTO!</button>
            </div>
         </section>
      )}

      {/* PANTALLA HUB */}
      {screen === 'home' && (
        <section id="house-screen" className="screen active">
            <div className="house-header"><h2>Hola, {formData.ownerName}</h2></div>
            <div className="living-room-floor">
              <div className="pet-container">
                <img src={getBreedImage(formData.pet1Breed)} className="pet-sprite" />
                <p className="pet-name-tag">{formData.pet1Name}</p>
              </div>
              <div className="pet-container">
                <img src={getBreedImage(formData.pet2Breed)} className="pet-sprite" />
                <p className="pet-name-tag">{formData.pet2Name}</p>
              </div>
            </div>
            <div className="nav-bar">
                <button className="nav-btn kitchen" onClick={() => setScreen('kitchen')}>🍖 <span className="btn-label">Comer</span></button>
                <button className="nav-btn bathroom" onClick={() => setScreen('bathroom')}>🛁 <span className="btn-label">Bañar</span></button>
                <button className="nav-btn garden" onClick={() => setScreen('garden')}>🎾 <span className="btn-label">Jugar</span></button>
                <button className="nav-btn sleep" onClick={() => setScreen('bedroom')}>🌙 <span className="btn-label">Dormir</span></button>
            </div>
        </section>
      )}

      {/* PANTALLA COCINA */}
      {screen === 'kitchen' && (
        <section id="kitchen-screen" className="screen active">
            <button className="back-btn" onClick={() => {setScreen('home'); setSelectedItem(null);}}>⬅ Volver</button>
            <div className="kitchen-floor">
              {/* Perro 1: Acepta Click y Drop */}
              <div 
                className={`pet-container ${selectedItem ? 'can-feed' : ''}`}
                onDragOver={handleDragOver} 
                onDrop={(e) => handleDrop(e, 'pet1', formData.pet1Name)}
                onClick={() => handlePetClick('pet1', formData.pet1Name)}
              >
                {feedFeedback.show && feedFeedback.pet === formData.pet1Name && <div className="feedback-bubble">{feedFeedback.text}</div>}
                <img src={getBreedImage(formData.pet1Breed)} className="pet-sprite" />
                <p className="pet-name-tag">{formData.pet1Name}</p>
              </div>

              {/* Perro 2 */}
              <div 
                className={`pet-container ${selectedItem ? 'can-feed' : ''}`}
                onDragOver={handleDragOver} 
                onDrop={(e) => handleDrop(e, 'pet2', formData.pet2Name)}
                onClick={() => handlePetClick('pet2', formData.pet2Name)}
              >
                {feedFeedback.show && feedFeedback.pet === formData.pet2Name && <div className="feedback-bubble">{feedFeedback.text}</div>}
                <img src={getBreedImage(formData.pet2Breed)} className="pet-sprite" />
                <p className="pet-name-tag">{formData.pet2Name}</p>
              </div>
            </div>

            <div className="food-bar">
                {foodItems.map((food) => (
                    <div 
                        key={food.id} 
                        className={`food-item ${selectedItem?.name === food.name ? 'item-selected' : ''}`}
                        draggable={true} 
                        onDragStart={(e) => handleDragStart(e, food.name, 'food')}
                        onClick={() => handleItemClick(food.name, 'food')} // ¡CLICK PARA IPHONE!
                    >
                        {food.icon}
                    </div>
                ))}
            </div>
        </section>
      )}

      {/* PANTALLA BAÑO */}
      {screen === 'bathroom' && (
        <section id="bathroom-screen" className="screen active">
            <button className="back-btn" onClick={() => {setScreen('home'); setSelectedItem(null);}}>⬅ Volver</button>
            <div className="bathroom-floor">
              <div 
                className={`pet-container ${!petCleanliness.pet1 ? 'pet-dirty' : ''} ${selectedItem ? 'can-feed' : ''}`} 
                onDragOver={handleDragOver} 
                onDrop={(e) => handleDrop(e, 'pet1', formData.pet1Name)}
                onClick={() => handlePetClick('pet1', formData.pet1Name)}
              >
                {!petCleanliness.pet1 && <div className="dirt-icon">🪰</div>}
                {feedFeedback.show && feedFeedback.pet === formData.pet1Name && <div className="feedback-bubble">{feedFeedback.text}</div>}
                <img src={getBreedImage(formData.pet1Breed)} className="pet-sprite" />
                <p className="pet-name-tag">{formData.pet1Name}</p>
              </div>

              <div 
                className={`pet-container ${!petCleanliness.pet2 ? 'pet-dirty' : ''} ${selectedItem ? 'can-feed' : ''}`} 
                onDragOver={handleDragOver} 
                onDrop={(e) => handleDrop(e, 'pet2', formData.pet2Name)}
                onClick={() => handlePetClick('pet2', formData.pet2Name)}
              >
                {!petCleanliness.pet2 && <div className="dirt-icon">🪰</div>}
                {feedFeedback.show && feedFeedback.pet === formData.pet2Name && <div className="feedback-bubble">{feedFeedback.text}</div>}
                <img src={getBreedImage(formData.pet2Breed)} className="pet-sprite" />
                <p className="pet-name-tag">{formData.pet2Name}</p>
              </div>
            </div>
            <div className="tools-bar">
                {bathTools.map((tool) => (
                    <div 
                        key={tool.id} 
                        className={`tool-item ${selectedItem?.name === tool.name ? 'item-selected' : ''}`} 
                        draggable={true} 
                        onDragStart={(e) => handleDragStart(e, tool.name, 'tool')}
                        onClick={() => handleItemClick(tool.name, 'tool')}
                    >
                        {tool.icon}
                    </div>
                ))}
            </div>
        </section>
      )}

      {/* PANTALLA PATIO */}
      {screen === 'garden' && (
        <section id="garden-screen" className="screen active">
            <button className="back-btn" onClick={() => setScreen('home')}>⬅ Volver</button>
            <div className="score-board">Puntos: {score}</div>
            {feedFeedback.show && feedFeedback.pet === 'both' && (
                 <div className="feedback-bubble" style={{top: '30%', left: '50%', transform: 'translateX(-50%)', fontSize: '1.5rem'}}>{feedFeedback.text}</div>
            )}
            <div className="garden-floor">
              <div className={`pet-container ${isBallThrown ? 'pet-jump' : ''}`}>
                <img src={getBreedImage(formData.pet1Breed)} className="pet-sprite" />
                <p className="pet-name-tag">{formData.pet1Name}</p>
              </div>
              <div className={`pet-container ${isBallThrown ? 'pet-jump' : ''}`}>
                <img src={getBreedImage(formData.pet2Breed)} className="pet-sprite" />
                <p className="pet-name-tag">{formData.pet2Name}</p>
              </div>
            </div>
            <div className={`ball ${isBallThrown ? 'thrown' : ''}`} onClick={throwBall}>🎾</div>
        </section>
      )}

      {/* PANTALLA DORMITORIO */}
      {screen === 'bedroom' && (
        <section id="bedroom-screen" className="screen active">
            <button className="back-btn" onClick={() => setScreen('home')}>⬅ Volver</button>
            {!lightsOn && <div className="night-overlay"></div>}
            <div className="light-switch" onClick={toggleLights}>{lightsOn ? '☀️' : '🌙'}</div>
            <div className="bedroom-floor">
              <div className="pet-container">
                {!lightsOn && <div className="zzz-bubble">Zzz...</div>}
                <img src={getBreedImage(formData.pet1Breed)} className="pet-sprite" />
                <p className="pet-name-tag">{formData.pet1Name}</p>
              </div>
              <div className="pet-container">
                {!lightsOn && <div className="zzz-bubble">Zzz...</div>}
                <img src={getBreedImage(formData.pet2Breed)} className="pet-sprite" />
                <p className="pet-name-tag">{formData.pet2Name}</p>
              </div>
            </div>
        </section>
      )}

    </div>
  );
}

export default App;