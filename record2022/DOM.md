#### 1014

1、节点都有一个 childNodes 属性,其中包含一个 NodeList 的实例。 NodeList 是一个类数组对象，用于存储可以按位置存取的有序节点。
2、DOM 结构的变化会自动地在 NodeList 中反映出来。我们通常说 NodeList 是实时的活动对象，而不是第一次访问时所获得内容的快照。
3、childNodes 中的所有节点都有同一个父元素，因此它们的 parentNode 属性都指向同一个节点。此外， childNodes 列表中
的每个节点都是同一列表中其他节点的同胞节点。
4、appendChild() ：用于在 childNodes 列表末尾添加节点。
