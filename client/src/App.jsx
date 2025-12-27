import { useState } from 'react';
import './index.css';
import './App.css';

function App() {
  const [screen, setScreen] = useState('welcome');

  // --- ESTADO DEL FORMULARIO (Aquí guardamos los datos) ---
  const [formData, setFormData] = useState({
    ownerName: '',
    pet1Name: '',
    pet1Breed: '',
    pet2Name: '',
    pet2Breed: ''
  });
  
  // Lista de razas
  const breeds = [
    { id: 'labrador', img: '/razas/labrador.png', name: 'Labrador' },
    { id: 'pug', img: '/razas/pug.png', name: 'Pug' },
    { id: 'pastor', img: '/razas/pastor1.png', name: 'Pastor' }
  ];

  // Función para manejar cambios en los textos
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Función para seleccionar raza
  const selectBreed = (petNumber, breedId) => {
    setFormData({ ...formData, [`pet${petNumber}Breed`]: breedId });
  };

  // Función para guardar y entrar
  const handleStart = () => {
    if (!formData.ownerName || !formData.pet1Name || !formData.pet2Name || !formData.pet1Breed || !formData.pet2Breed) {
      alert("¡Por favor completa todos los campos para tus perritos!");
      return;
    }
    console.log("Datos guardados:", formData); 
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
         <section id="register-screen" className="screen active scrollable">
            <div className="register-card">
              <h2>¡Vamos a conocernos!</h2>
              
              {/* Sección Dueño */}
              <div className="form-group">
                <label>Tu Nombre:</label>
                <input 
                  type="text" 
                  name="ownerName" 
                  placeholder="¿Cómo te llamas?" 
                  value={formData.ownerName}
                  onChange={handleInputChange}
                />
              </div>

              {/* Sección Mascota 1 */}
              <div className="pet-section">
                <h3>🐶 Perrito 1</h3>
                <input 
                  type="text" 
                  name="pet1Name" 
                  placeholder="Nombre de tu primer perrito"
                  value={formData.pet1Name}
                  onChange={handleInputChange}
                />
                <p>Elige su raza:</p>
                <div className="breed-options">
                  {breeds.map((breed) => (
                    <div 
                      key={breed.id} 
                      className={`breed-icon ${formData.pet1Breed === breed.id ? 'selected' : ''}`}
                      onClick={() => selectBreed(1, breed.id)}
                    >
                      <img src={breed.img} alt={breed.name} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Sección Mascota 2 */}
              <div className="pet-section">
                <h3>🐶 Perrito 2</h3>
                <input 
                  type="text" 
                  name="pet2Name" 
                  placeholder="Nombre de tu segundo perrito"
                  value={formData.pet2Name}
                  onChange={handleInputChange}
                />
                <p>Elige su raza:</p>
                <div className="breed-options">
                  {breeds.map((breed) => (
                    <div 
                      key={breed.id} 
                      className={`breed-icon ${formData.pet2Breed === breed.id ? 'selected' : ''}`}
                      onClick={() => selectBreed(2, breed.id)}
                    >
                       <img src={breed.img} alt={breed.name} />
                    </div>
                  ))}
                </div>
              </div>

              <button className="btn-primary full-width" onClick={handleStart}>
                ¡TODO LISTO! ENTRAR A CASA
              </button>
            </div>
         </section>
      )}

      {/* --- PANTALLA 3: HOME (Placeholder) --- */}
      {screen === 'home' && (
        <div style={{color: 'white', textAlign: 'center', paddingTop: '50px'}}>
            <h1>¡Hola {formData.ownerName}!</h1>
            <p>Aquí estarán {formData.pet1Name} y {formData.pet2Name}.</p>
            <p>(Próximamente: La Sala de Estar)</p>
        </div>
      )}

    </div>
  );
}

export default App;