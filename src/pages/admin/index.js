import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductStart, fetchProductsStart, deleteProductStart } from '../../redux/Products/products.actions';
import Modal from './../../components/modal';
import FormInput from './../../components/forms/formInput';
import Button from './../../components/forms/button';
import FormSelect from '../../components/formSelect';
import LoadMore from '../../components/loadMore';
import './styles.scss';

//.svg file
import Snus from '../../components/snus/snusFile';

const mapState = ({ productsData }) => ({
    products: productsData.product
});



const Admin = props => {
    const { products } = useSelector(mapState);
    const dispatch = useDispatch();
  //const [products, setProducts] = useState([]);
  const [hideModal, setHideModal] = useState(true);
  const [productCategory, setProductCategory] = useState('Fresh');
  const [productName, setProductName] = useState('');
  const [productFlavour, setProductFlavour] = useState('');
  const [productColor, setProductColor] = useState('#000000');
  const [productBackground, setProductBackground] = useState('');
  const [productPrice, setProductPrice] = useState(0);

  const { data, queryDoc, isLastPage } = products;

useEffect( () => {
    dispatch(
        fetchProductsStart()
    );


}, [])

  const toggleModal = () => setHideModal(!hideModal);

  const configModal = {
    hideModal,
    toggleModal
  };

  const resetForm = () => {

    setProductCategory('Fresh');
    setProductName('');
    setProductFlavour('');
    setProductColor('#000000');
    setProductBackground('');
    setProductPrice(0);

    setHideModal(true);

}


  const handleSubmit = e => {
    e.preventDefault();

    dispatch(
        addProductStart({

        productCategory,
        productName,
        productFlavour,
        productColor,
        productBackground,
        productPrice

        })
    );

    resetForm();

  };

  const handleLoadMore = () => {

    dispatch(
        fetchProductsStart( { 
            startAfterDoc: queryDoc,
            persistProducts: data
        
        })
    )

};

const configLoadMore = {
    onLoadMoreEvent: handleLoadMore,
};

  return (
    <div className="admin">

      <div className="callToActions">
        <ul>
          <li>
            <Button onClick={() => toggleModal()}>
              Add new product
            </Button>
          </li>
        </ul>
      </div>

      <Modal {...configModal}>
        <div className="addNewProductForm">
          <form onSubmit={handleSubmit}>

            <h2>
              Add new product
            </h2>

            <FormSelect
              label="Category"
              options={[{
                value: "fresh",
                name: "Fresh"
              }, {
                value: "exotic",
                name: "Exotic"
              }]}
              handleChange={e => setProductCategory(e.target.value)}
            />

            <FormInput
              label="Name"
              type="text"
              value={productName}
              handleChange={e => setProductName(e.target.value)}
            />

            <FormInput
              label="Background image"
              type="url"
              value={productBackground}
              handleChange={e => setProductBackground(e.target.value)}
            />

            <FormInput
              label="Flavour"
              type="text"
              value={productFlavour}
              handleChange={e => setProductFlavour(e.target.value)}
            />

            <FormInput
              label="Color"
              type="color"
              value={productColor}
              handleChange={e => setProductColor(e.target.value)}
            />

            <FormInput
              label="Price"
              type="number"
              min="0.00"
              max="10000.00"
              step="0.01"
              value={productPrice}
              handleChange={e => setProductPrice(e.target.value)}
            />

            <Button type="submit">
              Add product
            </Button>

          </form>

          <div>
          <Snus color={productColor} flavour={productFlavour} name={productName} background={productBackground}/>
        </div>

        </div>
      </Modal>

      <div className='manageProducts'>
              <table border="0" cellPadding="0" cellSpacing="0">
                  <tbody>
                      <tr>
                          <th>
                              <h1>
                                  Manage Products
                              </h1>
                          </th>
                      </tr>
                      <tr>
                          <td>
                              <table className='results' border="0" cellPadding="10" cellSpacing="0">
                                  <tbody>
                                      {(Array.isArray(data) && data.length > 0) && data.map((product, index) => {
                                        const {
                                              productName,
                                              productFlavour,
                                              productColor,
                                              productBackground,
                                              productPrice,
                                              documentID
                                        } = product;

                                          return (
                                            <tr key={index}>
                                                <td>
                                                <Snus color={productColor} flavour={productFlavour} name={productName} background={productBackground}/>
                                                
                                                </td>
                                                <td>
                                                    {productName}
                                                </td>
                                                <td>
                                                    {productPrice}kr
                                                </td>
                                                <td onClick={ () => dispatch(deleteProductStart(documentID))}>
                                                    <Button>
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>

                                          )
                                      })}
                                  </tbody>
                              </table>
                          </td>
                      </tr>
                      <tr>
                        <td>

                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table border = "0" cellPadding="10" cellSpacing="0">
                                      <tbody>
                                        <tr>
                                          <td>
                                            {!isLastPage && (<LoadMore {...configLoadMore}/>)}
                                          </td>
                                        </tr>
                                      </tbody>
                          </table>
                        </td>
                      </tr>
                  </tbody>
              </table>
      </div>

      

    </div>
  );
}

export default Admin;