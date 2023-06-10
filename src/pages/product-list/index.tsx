import BreadCumb from '@/components/common/BreadCumb'
import React from 'react'

const ProductList = () => {
  return (
    <div id="product-list">
      <BreadCumb navigations={["Home", "Shop", "Page 2"]}/>
    </div>
  )
}

export default ProductList