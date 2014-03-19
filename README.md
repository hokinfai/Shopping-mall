#部署

目前只是一个空的框架而已，当然已经可以运行了

```
git clone https://username:password@bitbucket.org/ceclinux/shopmall (in the first time only)
进入shopmall文件夹
npm install
bower install
node app.js
```

要看的文档已经移到`Wiki`

#注意

每次`pull`完之后别忘记`npm install`

1. 请把`nodejs`更新到最新的版本
2. 全局安装gulp, `npm install -g gulp`
3. **windows用户特别注意**, 压缩图片的库依赖于`imagemagick`请安装[imagemagick](http://www.imagemagick.org/download/binaries/ImageMagick-6.8.8-8-Q16-x64-dll.exe), 在安装的时候勾选` Update executable search path `,并且重命名`C:\\Windows\System32\convert.exe`这个文件，随便什么名字都可以

