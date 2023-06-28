/* eslint-disable @next/next/no-img-element */
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import IconButton from '@mui/joy/IconButton';
import Tooltip from '@mui/joy/Tooltip';
import Typography from '@mui/joy/Typography';
import { Box } from '@mui/material';
import Rating from '@mui/material/Rating';
import React, { memo } from 'react';
import styles from './styles.module.css';

interface ProductProps {
    brand: string;
    category: string;
    description: string;
    discountPercentage: number;
    id: number;
    images: string[];
    price: number;
    rating: number;
    stock: number;
    thumbnail: string;
    title: string;
}

const Product: React.FC<ProductProps> = ({ id, thumbnail, price, title, brand, rating, discountPercentage, description, category, stock, images }) => {
    const originalPrice = Math.floor(price / (1 - discountPercentage / 100))
    return (
        <Card variant="outlined" sx={{ width: 320 }} className={styles.cardCtn}>
            <div>
                <Typography level="h2" fontSize="md" sx={{ mb: 0.5, maxWidth: '180' }}>
                    {title}
                </Typography>
                <Rating value={rating} readOnly />
                <IconButton
                    aria-label="bookmark Bahamas Islands"
                    variant="plain"
                    color="neutral"
                    size="sm"
                    sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem', color: 'red' }}
                >
                    <Typography className={styles.discount}>{`-${discountPercentage}%`}</Typography>
                </IconButton>
            </div>
            <AspectRatio minHeight="120px" maxHeight="200px">
                <img
                    src={thumbnail}
                    loading="lazy"
                    alt={`products-${id}`}
                />

                {/* <Image
                    src={thumbnail}
                    width={100}
                    height={100}
                    loading="lazy"
                    alt={`products-${id}`}
                    style={{ objectFit: "cover" }}
                /> */}
            </AspectRatio>
            <Box className={styles.ctnImgslider}>

                {images.map((image, i) => (
                    <div key={i} className={styles.itemSlider}>
                        <img src={image} loading="lazy" alt={`productSlider-${i}`} />
                    </div>
                ))}
            </Box>
            <CardContent orientation="horizontal">
                <div>
                    <Box className={styles.desc}>
                        <Tooltip color="primary" title={description} variant="plain" arrow>

                            <Typography>{description}</Typography>
                        </Tooltip>
                    </Box>
                    <Box style={{ margin: '4px 0px 4px 0px' }}>
                        <Chip
                            variant="outlined"
                            color="primary"
                            // onClick={() => alert(``)}
                            size='sm'

                        >{category}</Chip>
                        <Chip

                            color="primary"
                            sx={{ marginLeft: '4px' }}
                            size='sm'

                        >{brand}</Chip>
                    </Box>
                    <Typography level="body3">Total price:</Typography>
                    <Box>
                        <Typography className={styles.Oriprice} >{`$ ${originalPrice}`}</Typography>

                        <Typography fontSize="lg" fontWeight="lg" className={styles.price}>
                            {`$ ${price}`}
                        </Typography>
                    </Box>
                    <Typography className={styles.stock}>{`available: ${stock}`}</Typography>
                </div>

            </CardContent>
        </Card>
    )
}

export default memo(Product)