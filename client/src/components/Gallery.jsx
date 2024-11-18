import React, { useState, useEffect } from 'react';
import './Gallery.css';
import { Container, Image, SimpleGrid, Modal } from '@mantine/core';

const importAllImages = () => {
  const images = import.meta.glob('../assets/gallery/*.{png,jpg,jpeg,svg}');
  const tagsMap = {
    '../assets/gallery/approach1.jpg': ['YES-J General', 'Anniversary'],
    '../assets/gallery/approach2': ['PEP', 'VIP'],
    '../assets/gallery/approach3.jpg': ['SS', 'MuST'],
    '../assets/gallery/goals2.jpg': ['SS', 'MuST'],
    '../assets/gallery/goals1.jpg': ['SS', 'YES-J General'],
    '../assets/gallery/goals3.jpg': ['Anniversary', 'MuST'],
    '../assets/gallery/group1.jpg': ['SS', 'MuST'],
    '../assets/gallery/group2.jpg': ['YES-J General', 'MuST'],
    '../assets/gallery/group3.jpg': ['SS', 'MAGIC'],
    '../assets/gallery/group2.png': ['MAGIC', 'MuST'],
    '../assets/gallery/pro1.jpg': ['SS', 'Anniversary'],
    '../assets/gallery/pro2.jpg': ['SS', 'YES-J General'],
    '../assets/gallery/pro3.jpg': ['SS', 'MuST'],
    '../assets/gallery/pro4.jpg': ['SS', 'MuST'],
    '../assets/gallery/pro5.jpg': ['YES-J General', 'MuST'],
    '../assets/gallery/pro6.jpg': ['Press', 'MAGIC'],
    '../assets/gallery/pro7.jpg': ['Yuvoṣṭsavaalu', 'PEP'],
    '../assets/gallery/pro8.jpg': ['PEP', 'Press'],
    '../assets/gallery/pro9.jpg': ['VIP', 'SSP'],
    '../assets/gallery/pro10.jpg': ['SS', 'Anniversary'],
    '../assets/gallery/pro11.jpg': ['Yuvoṣṭsavaalu', 'MAGIC'],
    '../assets/gallery/pro12.jpg': ['SS', 'Anniversary'],
    '../assets/gallery/pro13.jpg': ['Press', 'Anniversary'],
    '../assets/gallery/pro14.jpg': ['PEP', 'SSP'],
    '../assets/gallery/pro15.jpg': ['SSP', 'VIP'],
    '../assets/gallery/pro16.jpg': ['Yuvoṣṭsavaalu', 'Anniversary'],
    '../assets/gallery/pro17.jpg': ['VIP', 'Anniversary'],
    '../assets/gallery/pro18.jpg': ['SS', 'Press'],
    '../assets/gallery/pro19.jpg': ['SS', 'Anniversary'],
    '../assets/gallery/pro20.jpg': ['SSP', 'Yuvoṣṭsavaalu'],
    '../assets/gallery/pro21.jpg': ['VIP', 'PEP'],
  };

  return Object.keys(images).map((key) => ({
    importFn: images[key],
    tags: tagsMap[key] || ['All'], 
  }));
};

const tags = ['All', 'YES-J General', 'Anniversary', 'PEP', 'SS', 'MuST', 'MAGIC', 'VIP', 'SSP', 'Yuvoṣṭsavaalu', 'Press'];

const Gallery = () => {
  const [activeTag, setActiveTag] = useState('All');
  const [allImages, setAllImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);

  const loadImages = async () => {
    const images = await Promise.all(
      importAllImages().map(async (img) => {
        const mod = await img.importFn();
        return { src: mod.default, tags: img.tags };
      })
    );
    setAllImages(images);
    setFilteredImages(images);
  };

  useEffect(() => {
    loadImages();
  }, []);

  const filterImages = (tag) => {
    setActiveTag(tag);
    if (tag === 'All') {
      setFilteredImages(allImages);
    } else {
      setFilteredImages(allImages.filter((image) => image.tags.includes(tag)));
    }
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setModalOpened(true);
  };

  const closeModal = () => {
    setModalOpened(false);
    setSelectedImage(null);
  };

  return (
    <Container py={'4%'} size={'lg'}>
      <div className="tag-buttons mb-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            className={`px-4 py-2 rounded-md ${activeTag === tag ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => filterImages(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <SimpleGrid cols={3} spacing="lg">
        {filteredImages.map((image, index) => (
          <div
            key={index}
            className="relative overflow-hidden group cursor-pointer"
            onClick={() => openModal(image.src)}
          >
            <Image
              src={image.src}
              alt={`Gallery Image ${index + 1}`}
              radius="md"
              className="object-cover w-full h-full transition-transform duration-300 transform group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-black text-lg p-3 rounded-lg bg-white">Zoom</span>
            </div>
          </div>
        ))}
      </SimpleGrid>

      <Modal opened={modalOpened} onClose={closeModal} size="xl">
        {selectedImage && <Image src={selectedImage} alt="Selected" />}
      </Modal>
    </Container>
  );
};

export default Gallery;
