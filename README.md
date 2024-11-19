## Instalación

Siguir los siguientes pasos para configurar tanto el servidor backend (Django) como el cliente frontend (React).

---

### 1. Clonar el repositorio

Primero, clona el repositorio desde GitHub:

```bash
git clone https://github.com/ignacio-nava/django-react-crud.git
cd django-react-crud
```
### 2. Configuración del Backend (Server)

#### 1. Navegar a la carpeta del backend:

```bash
cd server
```

#### 2. Instalar las dependencias:
Teniendo Python 3.X y un *entorno virtual* creado y activo

```bash
pip install -r requirements.txt
```

#### 3. Realizar las migraciones:

```bash
python manage.py makemigrations
python manage.py migrate
```

#### 4. Crear un superusuario:

```bash
python manage.py createsuperuser
```

#### 5. Iniciar el servidor:

```bash
python manage.py runserver
```

#### URLs disponibles
- /admin/ Panel de administración (usa el superusuario para iniciar sesión).
- /docs/ Documentación de la API generada automáticamente.
- /redoc/ Documentación alternativa de la API.


### 3. Configuración del Frontend (Client)

#### 1. Navegar a la carpeta del backend:

```bash
cd client
```

#### 2. Instalar las dependencias:

```bash
npm install
# o con yarn
yarn install
```

#### 3. Iniciar el servidor de desarrollo:

```bash
npm run dev
# o con yarn
yarn dev
```


