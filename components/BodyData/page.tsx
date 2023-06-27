"use client"
import Loading from '@/Loading';
import Product from '@/Product/page';
import { Box, Grid, TextField } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { v4 as uuidv4 } from 'uuid';
import GetProductsClient from '../../clients/GetProductsClient';
import { DEFAULT_FETCH_LIMIT, DEFUALUT_FETCH_LOADMORE } from '../../constants';
import { useDebounce } from '../../hooks/useDebounce';
import styles from './styles.module.css';

interface Product {
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

const BodyData: React.FC = () => {
    const loadMoreRef = useRef<HTMLDivElement>(null)
    const [loading, setLoading] = useState(false)
    const [loadMore, setLoadMore] = useState(false)
    const [limit, setLimit] = useState(DEFAULT_FETCH_LIMIT)
    const [products, setProducts] = useState<Product[]>([]);

    const debouncedLimit = useDebounce(limit, 1500)
    const getProduct = useCallback(async () => {
        try {
            setLoading(true)
            const response = await GetProductsClient.GetPerPageProductsClient(debouncedLimit)
            if (response) {
                setProducts(response)
            }
            setLoading(false)
            setLoadMore(true)
        } catch (error) {
            console.log(error)
        }
    }, [debouncedLimit])
    useEffect(() => {

        getProduct()
    }, [getProduct])
    console.log('ad', products)
    const loadMoreData = () => {
        setLimit(prev => prev + DEFUALUT_FETCH_LOADMORE)
    }

    useEffect(() => {
        if (loadMore && loadMoreRef.current) {
            const observer = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    loadMoreData()
                }

            }, { threshold: 1 })
            observer.observe(loadMoreRef.current)
        }

    }, [loadMore])
    return (
        <>
            <Grid container className={styles.bodyctn}>
                <Grid item xs={12} style={{ display: 'flex', padding: '20px' }} justifyContent='center' alignItems='center' >
                    <TextField
                        className={styles.input}
                        label="Multiline"
                        sx={{ input: { color: 'white' }, fieldset: { borderColor: "#ffffff2e" }, label: { color: 'white' } }}
                        id="outlined-basic"
                        variant="outlined" />
                    <Box className={styles.si}>
                        <BiSearch />
                    </Box>
                </Grid>
                <Grid container item className={styles.productCtn} spacing={2}>
                    {/* {loading ? <Loading content='loading' /> : products?.map((product) => (
                        <Grid item key={product.id} lg={3} xs={6} md={4} className={styles.product} alignItems='center' justifyContent='center'>
                            <Product {...product} />
                        </Grid>
                    ))} */}
                    {products?.map((product) => (
                        <Grid item key={uuidv4()} lg={3} xs={6} md={4} className={styles.product} alignItems='center' justifyContent='center'>
                            <Product {...product} />
                        </Grid>
                    ))}

                </Grid>
                <Grid>
                    <div ref={loadMoreRef} />
                    <Loading content='loading' />
                </Grid>
            </Grid >


        </>
    )
}

export default BodyData