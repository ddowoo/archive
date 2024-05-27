# selector에서 async set은 지원하지 않는다.

### custom hook을 만들어 해결한다

```typescript
const useRecoilDollar = () => {
  // 달러는 recoil dollar와 값 동기화 유지
  const [localDollar, setLocalDollar] = useState(0);
  const [lodableDollar, setDollar] = useRecoilStateLoadable(dollarState);

  useEffect(() => {
    if (lodableDollar.state === 'hasValue') {
      setLocalDollar(lodableDollar.contents);
    }
  }, [lodableDollar]);

  // selector set에서 비동기 해줘야 하는 작업
  const setDollar = async (inputDollar: number) => {
    const res = await fetch('https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD');
    const result = await res.json();
    const exchangeRate = result[0].basePrice;
    const exchangedWon = exchangeRate * inputDollar;
    // 비동기로 구해진 값을 set해준다
    setRealTimeDollar(exchangedWon);
  };

  return { dollar, setDollar };
};
```
