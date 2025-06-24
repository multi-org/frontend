import { useState } from "react";
import { AddProduct } from "../AddProduct";
import { AddSpaceStepZero } from "../AddSpace";
import { AddServiceStepZero } from "../AddService";
import { AddEquipmentStepZero } from "../AddEquipment";

export default function NewProduct() {

    const [chosenProduct, setChosenProduct] = useState(0);

    const handleChosenProduct = (chosenProduct: number) => {
        setChosenProduct(chosenProduct);
    }

    return (
        <>
            {chosenProduct === 0 && (
                <AddProduct onChosenProduct={handleChosenProduct}/>
            )}
            {chosenProduct === 1 && (
                <AddSpaceStepZero onChosenProduct={handleChosenProduct}/>
            )}
            {chosenProduct === 2 && (
                <AddServiceStepZero onChosenProduct={handleChosenProduct}/>
            )}
            {chosenProduct === 3 && (
                <AddEquipmentStepZero onChosenProduct={handleChosenProduct} />
            )}
        </>
    )
}

export { NewProduct }