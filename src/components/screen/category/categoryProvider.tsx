import React, { createContext, useEffect, useState } from 'react';
import { useFirestoreDocument } from '../../../firebase';
import { USERS_HOME, useUserUID } from '../../../authentication';
export const CatalogContext = createContext({
  save: () => {},
  catalog: [{}],
  setCatalog: (catalog: any) => {},
});
export const CategoryProvider = ({ children }) => {
  const [catalog, setCatalog] = useState([]);
  const uid = useUserUID();
  const { updateRecord, data: catalogList } = useFirestoreDocument([
    USERS_HOME,
    uid,
  ]);
  useEffect(() => {
    setCatalog(catalogList?.catalog);
  }, [catalogList, uid]);
  const save = async () => {
    await updateRecord({ catalog });
  };
  return (
    <CatalogContext.Provider
      value={{
        catalog,
        setCatalog,
        save,
      }}>
      {children}
    </CatalogContext.Provider>
  );
};
