import React, {useEffect, useState} from 'react'

import Product from './Product';
import Input from './Input';
import { useStateContext } from '../context/StateContext';

const Filter = ({products}) => {

   const [filterId, setFilterId] = useState('');
   const [filteredProducts, setFilteredProducts] = useState(products);
   const {nameFilter} = useStateContext();

   useEffect(() => {
      if (filterId === 'all') {
         setFilteredProducts(products)
      } else {
         setFilteredProducts(products.filter(product => product.filter === filterId))
      }
     return filteredProducts;
   }, [filterId])
   
   useEffect(() => {
      if (nameFilter === '') {
         setFilteredProducts(products);
         setFilterId('all');
      } else {
         const searchedProduts = products.filter(item => 
            item.name.toLowerCase().includes(nameFilter.toLowerCase()) 
         )
         setFilteredProducts(searchedProduts);
      }
   }, [nameFilter])
   

   const categories = [
      {
         name: 'All products',
         id: 'all',
      },
      {
         name: 'Smart watches',
         id: 'watch',
      },
      {
         name: 'Headphones',
         id: 'headphones',
      },
      {
         name: 'Earphones',
         id: 'earphones',
      },
      {
         name: 'Speakers',
         id: 'speaker',
      },
   ];
   return (
      <div>
         <div className="filter-container">
            <div className="filter-wrapper">
               {categories.map(category => 
                  <div 
                     className='filter-item'
                     key={category.id}
                     onClick={() => setFilterId(category.id)}
                  >{category.name}</div>)}
               <Input />
            </div>
         </div>
         <div className="products-container">
            {filteredProducts?.map(product => <Product key={product._id} product={product}/>)}
         </div>
      </div>
   )
}

export default Filter