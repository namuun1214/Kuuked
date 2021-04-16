import React, { createContext, useEffect, useState } from 'react';
import { useFirestoreDocument } from '../../../firebase';
import { USERS_HOME, useUserUID } from '../../../authentication';
export const UserContext = createContext({
  isMenuClicked: false,
  setMenuClicked: (click: boolean) => {},
  userInfo: {},
});
export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const uid = useUserUID();
  const { data: userInfos } = useFirestoreDocument([USERS_HOME, uid]);
  const [isMenuClicked, setMenuClicked] = useState<boolean>(false);
  useEffect(() => {
    setUserInfo(userInfos?.babyInformation || {});
  }, [uid, userInfos]);
  return (
    <UserContext.Provider
      value={{
        isMenuClicked,
        setMenuClicked,
        userInfo,
      }}>
      {children}
    </UserContext.Provider>
  );
};
