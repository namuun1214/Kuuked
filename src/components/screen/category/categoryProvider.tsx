import React, { createContext, useState } from 'react';
import {
  useFirestoreCollection,
  useFirestoreDocument,
} from '../../../firebase';
import { USERS_HOME } from '../../../authentication';
import { useNavigation } from '@react-navigation/native';
import { NavigationRoutes } from '../../navigation/navigation-param';
export const CatalogContext = createContext({
  save: () => {},
  update: (id: any, catalog: any) => {},
  catalog: [{}],
  setCatalog: (catalog: any) => {},
});
export const CategoryProvider = ({ children }) => {
  const [catalog, setCatalog] = useState([]);
  const { updateRecord, data: catalogList } = useFirestoreDocument([
    USERS_HOME,
    'KBVP5kjHwluSqkvLgTRr',
  ]);

  const save = async () => {
    await updateRecord({ catalog });
  };
  const update = async (id, catalog) => {
    await updateRecord(id, catalog);
  };
  return (
    <CatalogContext.Provider
      value={{
        catalog,
        setCatalog,
        save,
        update,
      }}>
      {children}
    </CatalogContext.Provider>
  );
};
