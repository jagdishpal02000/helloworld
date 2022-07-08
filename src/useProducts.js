import { useEffect, useState } from "react";
import axios from "axios";

const useProduct = ({limit,skip}) => {
  const [load, setLoad] = useState(true);
  const [err, setErr] = useState(false);
  const [prod, setProd] = useState([]);

  useEffect(() => {
    setLoad(true);
    setErr(false);
    axios({
      method: "GET",
      url: "https://dummyjson.com/products",
      params: { limit,skip },
    })
      .then((res) => {
        setProd((prevProd) => {
          return [...new Set([...res.data.products])];
        });
        setLoad(false);
      })
      .catch((e) => {
        setErr(true);
        console.log(e);
      });
  }, [limit,skip]);
  return { load, prod, err };
};

export default useProduct;
