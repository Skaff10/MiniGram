# MiniGram

MiniGram is a full-stack social media application inspired by Instagram. It allows users to share moments, connect with others, and engage through posts and comments. Built with a modern tech stack, it offers a responsive and dynamic user experience.

## 🚀 Features

- **User Authentication**: Secure registration and login using JWT (JSON Web Tokens).
- **Create & Manage Posts**: Users can create, update, and delete their own posts with images.
- **Interactive Feed**: View posts from other users in a dynamic feed.
- **Comments System**: Engage with posts by adding, editing, and deleting comments.
- **User Profiles**: View and manage user profiles.
- **Responsive Design**: Fully responsive UI built with Tailwind CSS and DaisyUI for a seamless experience across devices.
- **Image Upload**: Integrated with Cloudinary for efficient image storage and management.

## 🛠️ Tech Stack

### Frontend
- **React** (via Vite): Fast and modern UI library.
- **Redux Toolkit**: Efficient state management.
- **Tailwind CSS & DaisyUI**: Utility-first CSS framework with pre-built components for styling.
- **Framer Motion**: For smooth animations and transitions.
- **React Router DOM**: For client-side routing.
- **Axios**: For making HTTP requests.
- **React Icons & Lucide React**: For beautiful iconography.

### Backend
- **Node.js & Express.js**: Robust runtime and web framework for the API.
- **MongoDB & Mongoose**: NoSQL database for storing data.
- **JWT (JSON Web Tokens)**: For secure user authentication.
- **Multer & Cloudinary**: For handling file uploads and cloud storage.
- **Bcryptjs**: For password hashing.

## 📦 Installation & Setup

Follow these steps to get the project running locally.

### Prerequisites
- Node.js installed on your machine.
- MongoDB installed locally or a MongoDB Atlas connection string.
- A Cloudinary account for image uploads.

### Steps

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/minigram.git
    cd minigram
    ```

2.  **Install Backend Dependencies**
    ```bash
    npm install
    ```

3.  **Install Frontend Dependencies**
    ```bash
    cd frontend
    npm install
    cd ..
    ```

4.  **Environment Variables**
    Create a `.env` file in the root directory and add the following variables:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    ```

5.  **Run the Application**
    To run both the backend and frontend concurrently:
    ```bash
    npm run dev
    ```
    - The backend will run on `http://localhost:5000` (or your defined PORT).
    - The frontend will typically run on `http://localhost:5173` (Vite default).

## 📜 Scripts

- `npm run dev`: Runs both backend and frontend concurrently.
- `npm run server`: Runs only the backend server.
- `npm run client`: Runs only the frontend application.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
