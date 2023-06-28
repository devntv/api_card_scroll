"use client"
import Loading from '@/Loading';
import Product from '@/Product/page';
import { ProductClient } from '@clients/index';
import { DEFAULT_FETCH_LIMIT, DEFUALUT_FETCH_LOADMORE } from '@constants/defaultNumb';
import useDebounce from '@hooks/useDebounce';
import { Box, Grid, TextField } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { v4 as uuidv4 } from 'uuid';
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
    const [value, setValue] = useState<string | number>('')
    const [loadMore, setLoadMore] = useState(false)
    const [limit, setLimit] = useState(DEFAULT_FETCH_LIMIT)
    const [products, setProducts] = useState<Product[]>([]);

    const debouncedLimit = useDebounce(limit, 1500)
    const getProduct = useCallback(async () => {
        try {
            const response = await ProductClient.GetPerPageProductsClient(debouncedLimit, value)
            if (response) {
                setProducts(response)
                setLoadMore(true)
            }
        } catch (error) {
            console.log(error)
        }
    }, [debouncedLimit, value])

    useEffect(() => {
        getProduct()
    }, [getProduct])
    console.log('ad', products)
    // console.log('render');

    const loadMoreData = useCallback(() => {
        setLimit(prev => prev + DEFUALUT_FETCH_LOADMORE)
    }, [])

    useEffect(() => {
        if (loadMore && loadMoreRef.current) {
            const observer = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    loadMoreData()
                }
            }, { threshold: 1 })
            observer.observe(loadMoreRef.current)
        }
    }, [loadMore, loadMoreData])

    // hooks
    // const observeLoadMore = useInfiniteScroll(loadMoreData, {
    //     threshold: 1,
    // });
    // useEffect(() => {
    //     if (loadMore && loadMoreRef.current) {
    //         observeLoadMore(loadMoreRef.current);
    //     }
    // }, [loadMore, observeLoadMore]);
    useEffect(() => {
        async function search() {
            const r = await ProductClient.SearchProductQuery('')
            // console.log('se', r)
        }
        search()
    }, [debouncedLimit])
    const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }


    return (
        <>
            <Grid container className={styles.bodyctn}>
                <Grid item xs={12} style={{ display: 'flex', padding: '20px' }} justifyContent='center' alignItems='center' >
                    <TextField
                        className={styles.input}
                        value={value}
                        label="search"
                        onChange={handleChangeText}
                        placeholder="input something..."
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
                <div ref={loadMoreRef} >
                    <Loading content='loading' />
                </div>
            </Grid >


        </>
    )
}

export default BodyData