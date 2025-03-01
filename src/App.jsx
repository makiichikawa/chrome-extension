import { storage } from '@extend-chrome/storage'
import { useEffect, useState } from 'react'
import './App.css'
import UrlList from './UrlList'
import { v4 as uuidv4 } from 'uuid'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function App() {
  const [urls, setUrls] = useState([])

  useEffect(() => {
    (async () => {
      const value = await storage.local.get("urls");
      if (value.urls) {
        setUrls(value.urls);
      }
    })();
  }, []);

  const getCurrentTab = async () => {
    const queryOptions = { active: true, lastFocusedWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }

  const getTags = (title) => {
    const tags = []
    const meatWords = ["肉", "牛", "豚", "鶏"]
    const fishWords = ["魚", "鮭", "鯖", "鯛"]
    const vegetableWords = ["野菜", "キャベツ", "トマト", "レタス", "きゅうり"]
    const riceFoodWords = ["ご飯", "パン", "麺", "うどん"]

    riceFoodWords.forEach(word => {
      if (title.includes(word)) {
        tags.push({
          name: "ごはんもの",
          className: "rice"})
      }
    })

    meatWords.forEach(word => {
      if (title.includes(word)) {
        tags.push({
          name: "主菜",
          className: "main"})
      }
    })

    fishWords.forEach(word => {
      if (title.includes(word)) {
        tags.push({
          name: "主菜",
          className: "main"})
      }
    })

    vegetableWords.forEach(word => {
      if (title.includes(word)) {
        tags.push({
          name: "副菜",
          className: "side"})
      }
    })

    if (tags.length === 0) {
      tags.push({
        name: "その他",
        className: "another"})
    }

    return tags;
  }

  const handAddUrl = async () => {
    const currentTab = await getCurrentTab();
    const url = await currentTab.url
    const title = await currentTab.title
    const newUrls = [...urls, { id: uuidv4(), url: url, title: title, tags: getTags(title) }]
    await storage.local.set({ urls: newUrls });
    setUrls(newUrls)
  }

  const handDeleteUrl = (id) => {
    const newUrls = urls.filter((url) => {
      return url.id !== id;
    });
    storage.local.set({ urls: newUrls });
    setUrls(newUrls);
  };

  const filterUrls = (tag) => {
    return urls.filter(url => {
      return url.tags[0].name === tag
    })
  }

  return (
    <div>
      <button onClick={handAddUrl}>URLを追加</button>
      <Tabs>
        <TabList>
          <Tab>主菜</Tab>
          <Tab>副菜</Tab>
          <Tab>ごはんもの</Tab>
          <Tab>その他</Tab>
        </TabList>
        <TabPanel>
          <UrlList urls={filterUrls("主菜")} handDeleteUrl={handDeleteUrl}/>
        </TabPanel>
        <TabPanel>
          <UrlList urls={filterUrls("副菜")} handDeleteUrl={handDeleteUrl}/>
        </TabPanel>
        <TabPanel>
          <UrlList urls={filterUrls("ごはんもの")} handDeleteUrl={handDeleteUrl}/>
        </TabPanel>
        <TabPanel>
          <UrlList urls={filterUrls("その他")} handDeleteUrl={handDeleteUrl}/>
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default App