# Stable Diffusion Model

This repository is dedicated to my minor project where I've implemented the Stable Diffusion Model for text-to-image and
image-to-image generation. The project is based on the
paper ["Latent Diffusion Models beating GANs at Image Synthesis"](https://arxiv.org/abs/2112.10752)
by [Robin Rombach](https://arxiv.org/search/cs?searchtype=author&query=Rombach,+R), [Andreas Blattmann](https://arxiv.org/search/cs?searchtype=author&query=Blattmann,+A), [Dominik Lorenz](https://arxiv.org/search/cs?searchtype=author&query=Lorenz,+D), [Patrick Esser](https://arxiv.org/search/cs?searchtype=author&query=Esser,+P), [Björn Ommer](https://arxiv.org/search/cs?searchtype=author&query=Ommer,+B).

## Imaginify

Imaginify is an innovative text-to-image and image-to-image generation project designed to unleash creativity. Users can
transform text prompts into captivating images and perform advanced manipulations on existing images.

### Features

#### Text-to-Image Generation

1. **Prompt-based Artistry:** Generate stunning images based on textual prompts.
2. **Creative Freedom:** Explore endless possibilities with various text inputs to create diverse visual outputs.

#### Image-to-Image Manipulation

1. **Enhanced Imagery:** Upscale and improve image quality with advanced algorithms.
2. **Artistic Transformations:** Apply artistic filters and style transfers to existing images.

#### Backend Features

- NodeTs Express service-based architecture with a modular design for easy extensibility and scalability.
- APIs can be created for any model and easily integrated into the project with minimal configuration.

#### Frontend Features

1. **Responsive Design:** User-friendly interface that seamlessly works across devices.
2. **Real-time Updates:** Stay informed with real-time updates for the most recent image transformations.

#### Screenshots
![Screenshot 2024-02-01 003834](https://github.com/Thre4dripper/StableDiffusion-WebApp/assets/82382156/703535cd-3dea-4c05-9a54-7e5b59fc722e)

![Screenshot 2024-02-01 003541](https://github.com/Thre4dripper/StableDiffusion-WebApp/assets/82382156/4a49faf1-9405-4097-b454-e86157b072e6)

![Screenshot 2024-02-01 003631](https://github.com/Thre4dripper/StableDiffusion-WebApp/assets/82382156/3465991e-ecbd-4f0f-a416-2311e1fd6297)

![Screenshot 2024-02-01 003612](https://github.com/Thre4dripper/StableDiffusion-WebApp/assets/82382156/da36954e-d607-4f76-ae69-ade50e5d7a78)

![Screenshot 2024-02-01 003802](https://github.com/Thre4dripper/StableDiffusion-WebApp/assets/82382156/8cedb128-f208-428b-b956-0d55f4f79a8f)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable)
- [MongoDB](https://docs.mongodb.com/manual/installation/)
- [VsCode](https://code.visualstudio.com/download)
- [Git](https://git-scm.com/downloads)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Thre4dripper/StableDiffusion-WebApp.git
```

2. Install dependencies for the backend:

```bash
cd backend && yarn
```

3. Install dependencies for the frontend:

```bash
cd frontend && yarn
```

4. Create a `.env` file in the `backend` directory and follow the format of the `.env.sample` file.
   Replace `<your-mongodb-uri>` with your MongoDB URI.

```bash
MONGO_URI=<your-mongodb-uri>
```

5. Start the backend server:

```bash
cd backend && yarn start
```

6. Start the frontend server:

```bash
cd frontend && yarn start
```

## Usage

1. **Text-to-Image:**
    - Enter a textual prompt.
    - Adjust configuration options if needed.
    - Click "Generate" to see the generated image.

2. **Image-to-Image Manipulation:**
    - Upload an image for manipulation.
    - Apply desired filters and transformations.
    - Preview and download the final image.

## Contributing

We welcome contributions! If you have ideas for improvements, feature requests, or bug reports,
please [open an issue](https://github.com/Thre4dripper/StableDiffusion-WebApp/issues) or submit a pull request.
