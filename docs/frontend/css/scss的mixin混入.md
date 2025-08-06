## 前言

**有些是工作总结，有些是技术文档搬运，有些是某视频刷到的，均会经过实践，留作总结，按需取舍。**

## 举栗1 minx简化media适配

```js
<style lang="scss" scoped>
$breakpoints: (
  "phone": (
    320px,
    480px
  ),
  "pad": (
    481px,
    768px
  ),
  "pc": (
    769px,
    1024px
  ),
  "tv": (
    1024px
  )
);

@mixin respond-to($breakname) {
  $bp: map-get($breakpoints, $breakname);
  @if type-of($bp) == "list" {
    $min: nth($bp, 1);
    $max: nth($bp, 2);
    @media screen and (min-width: $min) and (max-width: $max) {
      @content;
    }
  } @else {
    @media screen and (min-width: $bp) {
      @content;
    }
  }
}

.test {
  height: 100px;
  @include respond-to("phone") {
    background-color: red;
  }
  @include respond-to("pad") {
    background-color: green;
  }
  @include respond-to("pc") {
    background-color: yellow;
  }
  @include respond-to("tv") {
    background-color: purple;
  }
}
</style>
```

### 代码解释 

这段代码是使用Sass（特别是SCSS语法）编写的，它定义了一套响应式设计的工具，允许开发者根据不同的屏幕尺寸（如手机、平板、电脑、电视）来应用不同的样式。这种方法使得前端开发更加灵活和高效，尤其是在需要处理多种屏幕尺寸的响应式网页设计中。下面是详细解释：

####  1. 定义断点（Breakpoints）

首先，代码定义了一个名为`$breakpoints`的Sass映射（map），其中包含了四个键值对，每个键代表一个设备类型（如"phone"、"pad"、"pc"、"tv"），每个值是一个元组（tuple）或单个值，表示该设备类型对应的屏幕宽度范围。元组包含两个值，分别表示最小宽度和最大宽度（对于"tv"只定义了一个最小宽度，因为电视屏幕尺寸可能非常大，通常不需要定义最大宽度）。

```js
$breakpoints: (  
  "phone": (320px, 480px),  
  "pad": (481px, 768px),  
  "pc": (769px, 1024px),  
  "tv": (1024px)  
);
```

####  2. 定义Mixin

接下来，定义了一个名为`respond-to`的mixin，它接受一个参数`$breakname`（设备类型的名称）。这个mixin的作用是根据传入的设备类型名称，动态生成对应的媒体查询（media query）。

-   使用`map-get`函数从`$breakpoints`映射中获取与`$breakname`对应的值（即宽度范围或最小宽度）。
-   使用`type-of`函数检查获取到的值是一个列表（表示有最小和最大宽度）还是一个单独的值（表示只有最小宽度）。
-   如果是一个列表，就分别提取最小宽度（`$min`）和最大宽度（`$max`），并使用这些值来构建媒体查询，其中包含`min-width`和`max-width`条件。
-   如果是一个单独的值，就只使用这个值作为`min-width`条件来构建媒体查询。
-   在媒体查询块内部，使用`@content`指令来包含mixin被调用时传入的样式块。


```js
@mixin respond-to($breakname) {  
  // ... 省略了前面的代码  
  @content; // 这部分将被mixin调用时提供的样式块替换  
}
```

####  3. 使用Mixin

最后，在`.test`类中，通过调用`respond-to`mixin并传入不同的设备类型名称（如"phone"、"pad"、"pc"、"tv"），来定义不同屏幕尺寸下的背景颜色。


```js
.test {  
  height: 100px;  
  @include respond-to("phone") {  
    background-color: red;  
  }  
  // ... 省略了其他设备的样式  
}
```

当这段Sass代码被编译成CSS时，它将为`.test`类生成多个媒体查询块，每个块针对不同的屏幕尺寸范围应用不同的背景颜色。这样，网页就能根据不同的设备屏幕尺寸来自动调整样式，实现响应式设计。

### 转义为css代码如下

```js
.test {  
  height: 100px;  
}  
  
@media screen and (min-width: 320px) and (max-width: 480px) {  
  .test {  
    background-color: red;  
  }  
}  
  
@media screen and (min-width: 481px) and (max-width: 768px) {  
  .test {  
    background-color: green;  
  }  
}  
  
@media screen and (min-width: 769px) and (max-width: 1024px) {  
  .test {  
    background-color: yellow;  
  }  
}  
  
@media screen and (min-width: 1024px) {  
  .test {  
    background-color: purple;  
  }  
}
```

## 举栗2 利用循环简化重复代码


```js
.card-item {
  height: 100%;
  width: 19.5%;
  background-color: #f2f5fa;
  position: relative;
  padding-right: calc(var(--xs) * 5);

  @mixin card-item-style($background-image) {
    background: url($background-image) no-repeat;
    background-size: cover;
    color: #ffffff;
    text-align: left;

    .num {
      font-size: calc(var(--xxs) * 7);
    }
  }

  @for $i from 1 through 5 {
    &.card-item#{$i} {
      @include card-item-style("@/assets/images/jb/icon#{$i}.svg");
    }
  }
}

```

### 代码解释

这段代码是使用了Sass（一种CSS预处理器）的语法编写的，它包含了一些特定的Sass特性，如mixins（混合）和循环（for循环）。下面我将详细解释这段代码的各个部分：

#### 1. `.card-item` 选择器

```scss
.card-item {
  height: 100%;
  width: 19.5%;
  background-color: #f2f5fa;
  position: relative;
  padding-right: calc(var(--xs) * 5);
}
```

- 这是一个CSS类选择器，用于选择所有具有`card-item`类的HTML元素。
- 它设置了这些元素的高度为100%（相对于其父元素的高度），宽度为19.5%，背景颜色为`#f2f5fa`，定位方式为相对定位，并且在其右侧添加了基于CSS变量`--xs`的padding（`--xs`的值乘以5）。

#### 2. `@mixin card-item-style($background-image)`

```scss
@mixin card-item-style($background-image) {
  background: url($background-image) no-repeat;
  background-size: cover;
  color: #ffffff;
  text-align: left;

  .num {
    font-size: calc(var(--xxs) * 7);
  }
}
```

- 这是一个Sass mixin，它接受一个参数`$background-image`，该参数预期是一个图像URL。
- mixin内部定义了一系列样式规则，包括设置背景图像（使用传入的`$background-image`参数），设置背景图像的大小为cover（即图像覆盖整个元素区域，同时保持其宽高比），设置文本颜色为白色，设置文本对齐方式为左对齐。
- 此外，它还定义了一个嵌套的`.num`选择器，用于设置类名为`num`的子元素的字体大小为CSS变量`--xxs`的7倍。

#### 3. `@for $i from 1 through 5` 循环

```scss
@for $i from 1 through 5 {
  &.card-item#{$i} {
    @include card-item-style("@/assets/images/jb/icon#{$i}.svg");
  }
}
```

- 这是一个Sass循环，它从1迭代到5（包括1和5）。
- 对于循环中的每个`$i`值，它都会生成一个复合选择器`.card-item.card-item#{$i}`，这里使用了Sass的字符串插值功能来动态生成类名（如`.card-item.card-item1`、`.card-item.card-item2`等）。
- 对于每个这样的复合选择器，它都调用了之前定义的`card-item-style` mixin，并将一个字符串（由`"@/assets/images/jb/icon"`和`$i`的值组成，再加上`.svg`扩展名）作为`$background-image`参数传递给mixin。

#### 注意点

- 这段代码中的`@/assets/images/jb/icon#{$i}.svg`路径是Vue项目中的常见路径格式，但在纯CSS或Sass环境中，它不会被自动解析为URL。在Sass文件中，您可能需要使用函数（如`url()`函数）来确保路径被正确处理，但在Vue项目中，这种路径通常由Webpack等构建工具在构建过程中自动处理。
- CSS变量（如`--xs`和`--xxs`）必须在使用它们的样式表的相同作用域内或更高级别的作用域内定义。
- Sass mixins和循环等特性在编译成CSS时会被扩展成实际的CSS代码，因此在最终生成的CSS文件中，您不会看到Sass特有的语法（如`@mixin`、`@for`等）。

### 转译为css如下


```js
.card-item {
  height: 100%;
  width: 19%;
  background-color: #f2f5fa;
  position: relative;
  padding-right: calc(var(--xs) * 5);

  &.card-item1 {
    background: url("@/assets/images/jb/icon1.svg") no-repeat;
    background-size: cover;
    color: #ffffff;
    text-align: left;

    .num {
      font-size: calc(var(--xxs) * 7);
    }
  }

  &.card-item2 {
    background: url("@/assets/images/jb/icon2.svg") no-repeat;
    background-size: cover;
    color: #ffffff;
    text-align: left;

    .num {
      font-size: calc(var(--xxs) * 7);
    }
  }

  &.card-item3 {
    background: url("@/assets/images/jb/icon3.svg") no-repeat;
    background-size: cover;
    color: #ffffff;
    text-align: left;

    .num {
      font-size: calc(var(--xxs) * 7);
    }
  }

  &.card-item4 {
    background: url("@/assets/images/jb/icon4.svg") no-repeat;
    background-size: cover;
    color: #ffffff;
    text-align: left;

    .num {
      font-size: calc(var(--xxs) * 7);
    }
  }

  &.card-item5 {
    background: url("@/assets/images/jb/icon5.svg") no-repeat;
    background-size: cover;
    color: #ffffff;
    text-align: left;

    .num {
      font-size: calc(var(--xxs) * 7);
    }
  }
}
```

