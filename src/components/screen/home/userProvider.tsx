import React, { createContext, useEffect, useState } from 'react';
import { useFirestoreDocument } from '../../../firebase';
import { USERS_HOME, useUserUID } from '../../../authentication';
import moment from 'moment';
export const UserContext = createContext({
  isMenuClicked: false,
  setMenuClicked: (click: boolean) => {},
  userInfo: {},
  userAge: null,
});
export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const uid = useUserUID();
  const { data: userInfos } = useFirestoreDocument([USERS_HOME, uid]);
  const [isMenuClicked, setMenuClicked] = useState<boolean>(false);
  let bornDateMoment = moment(
    userInfos?.babyInformation?.bornDate,
    'YYYY/MM/DD',
  );
  const userAge = moment().diff(bornDateMoment, 'months');
  useEffect(() => {
    setUserInfo(userInfos?.babyInformation || {});
  }, [uid, userInfos]);
  return (
    <UserContext.Provider
      value={{
        isMenuClicked,
        setMenuClicked,
        userInfo,
        userAge,
      }}>
      {children}
    </UserContext.Provider>
  );
};
