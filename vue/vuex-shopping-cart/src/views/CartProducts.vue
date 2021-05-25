<template>
    <div>
        <span>{{cartProduct.id}}</span>
       
        <span v-for="product in cartProduct.products" :key="product.id">
            
                {{product.title}},
                {{product.description}}
           
        </span>
      
    </div>
</template>

<script>
export default{
    name:'CartProduct',
    props:["cartProduct"]

}
</script>