yarn build
registry=`npm get registry`
npm set registry http://10.211.10.151:80
npm publish
npm set registry http://10.26.10.163:80
npm publish
npm set registry $registry