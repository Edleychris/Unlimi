import { useState, useEffect } from 'react';
import AppContext from './AppContext';
import api from '../api/api';


const AppProvider = ({ children }) => {
  const [state, setState] = useState({ data: [], loading: true, error: null });
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const suppliers = ['FragranceX', 'FragranceNet', 'Morris Costumes'];
      try {
        const responses = await Promise.all(
          suppliers.map(supplier =>
            api.get('/products/public/catalog', {
              params: { supplier }
            })
          )
        );
        const combinedData = responses.reduce((acc, response) => acc.concat(response.data), []);
        setState({ data: combinedData, loading: false, error: null });
      } catch (error) {
        setState({ data: [], loading: false, error: 'Error fetching data' });
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery!== '') {
      const filtered = state.data.filter(item => {
        const snMatch = item.sn && item.sn.toString().toLowerCase().includes(searchQuery.toLowerCase());
        const skuMatch = item.SKU && typeof item.SKU === 'string' && item.SKU.toLowerCase().includes(searchQuery.toLowerCase());
        const nameMatch = item.Name && typeof item.Name === 'string' && item.Name.toLowerCase().includes(searchQuery.toLowerCase());
        const titleMatch = item.Title && typeof item.Title === 'string' && item.Title.toLowerCase().includes(searchQuery.toLowerCase());
        const descriptionMatch = item.Description && typeof item.Description === 'string' && item.Description.toLowerCase().includes(searchQuery.toLowerCase());
        const brandMatch = item.brandOrSupplier && typeof item.brandOrSupplier === 'string' && item.brandOrSupplier.toLowerCase().includes(searchQuery.toLowerCase());
        const costPriceMatch = item['Cost Price'] && item['Cost Price'].toString().toLowerCase().includes(searchQuery.toLowerCase());
        const quantityMatch = item.Quantity && item.Quantity.toString().toLowerCase().includes(searchQuery.toLowerCase());
        const sizeMatch = item.size && typeof item.size === 'string' && item.size.toLowerCase().includes(searchQuery.toLowerCase());

        return (
          snMatch ||
          skuMatch ||
          nameMatch ||
          titleMatch ||
          descriptionMatch ||
          brandMatch ||
          costPriceMatch ||
          quantityMatch ||
          sizeMatch
        )
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(state.data);
    }
  }, [searchQuery, state.data]);

  const handleSearch = (searchQuery) => {
    setSearchQuery(searchQuery);
  };

  return (
    <AppContext.Provider value={{ state, setState, handleSearch, filteredData }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
