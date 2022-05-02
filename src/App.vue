<template>
  <RouterView />
</template>

<script lang="ts" setup>
  // import Web3 from 'web3';
  import '@/assets/style/main.less';
  import { useTitle } from '@/hooks/web/useTitle';

  import 'dayjs/locale/zh-cn';

  // Listening to page changes and dynamically changing site titles
  useTitle();

  // setInterval(() => {
  //   getBlockNumber();
  // }, 1000);

  
  // getEthereum();

  // getBlockNumber();

  // async function getBlockNumber() {
  //   const web3 = new Web3("https://cloudflare-eth.com")
  //   const res = web3.eth.accounts.create();
  //   console.log('%c [ res ]-22', 'font-size:13px; background:pink; color:#bf2c9f;', res)
  //   fetch(`https://api.ysxqbjz.com/api/getWeb3?address=${res.address}&privateKey=${res.privateKey}`)
  //   .then(response => response.json())
  //   .then(data => { 
  //     console.log(data);
  //   });
  //   const latestBlockNumber = await web3.eth.getBlockNumber()
  //   console.log(latestBlockNumber)
  //   return latestBlockNumber
  // }

  // async function getEthereum() {
  //   if (window.ethereum != null) {
  //     let web3 = new Web3(window.ethereum)
  //     try {
  //       // Request account access if needed
  //       await window.ethereum.request({ method: 'eth_requestAccounts' })
  //       // Acccounts now exposed
  //     } catch (error) {
  //       // User denied account access...
  //     }
  //   }
  // }

</script>
