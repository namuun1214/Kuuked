import React, { createContext, useEffect, useState } from 'react';
import { useFirestoreDocument } from '../../../firebase';
import { USERS_HOME, useUserUID } from '../../../authentication';
export const CatalogContext = createContext({
  save: catalog => {},
  catalog: [{}],
});
export const CategoryProvider = ({ children }) => {
  const [catalog, setCatalog] = useState([]);
  const uid = useUserUID();
  const { updateRecord, data: catalogList } = useFirestoreDocument([
    USERS_HOME,
    uid,
  ]);
  useEffect(() => {
    setCatalog(catalogList?.catalog || []);
  }, [uid, catalogList]);
  const save = async catalog => {
    await updateRecord({ catalog });
  };
  return (
    <CatalogContext.Provider
      value={{
        catalog,
        save,
      }}>
      {children}
    </CatalogContext.Provider>
  );
};
