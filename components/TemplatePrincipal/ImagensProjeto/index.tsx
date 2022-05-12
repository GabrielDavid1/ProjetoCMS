import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export default function ImagensProjeto() {
  return (
    <Box sx={{ width: 500, height: 450, overflowY: 'scroll' }}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

const itemData = [
    {
        img: '/imagens/listagem/imagem1.png',
        title: 'imagem1',
    },
    {
        img: '/imagens/listagem/imagem2.png',
        title: 'imagem2',
    },
    {
        img: '/imagens/listagem/imagem3.png',
        title: 'imagem3',
    },
    {
        img: '/imagens/listagem/imagem4.png',
        title: 'imagem4',
    },
    {
    img: '/imagens/listagem/imagem5.png',
    title: 'imagem5',
    },
    {
    img: '/imagens/listagem/imagem6.png',
    title: 'imagem6',
    },
    {
    img: '/imagens/listagem/imagem7.png',
    title: 'imagem7',
    },
    {
    img: '/imagens/listagem/imagem8.png',
    title: 'imagem8',
    },
    {
    img: '/imagens/listagem/imagem9.png',
    title: 'imagem9',
    },
    {
    img: '/imagens/listagem/imagem10.png',
    title: 'imagem10',
    },
    {
    img: '/imagens/listagem/imagem11.png',
    title: 'imagem11',
    },
    {
    img: '/imagens/listagem/imagem12.png',
    title: 'imagem12',
    },
];
