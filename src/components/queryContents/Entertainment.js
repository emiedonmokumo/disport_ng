import { useState, useEffect } from "react"
import { getFirestore, collection, where, getDocs, query, orderBy, limit } from "firebase/firestore"
import app from "../../config/firebase"
import PostList from "../PostList"
const db = getFirestore(app)

const Entertainment = () => {
    const [queryContent, setQueryContent] = useState()
    useEffect(()=>{
        const searchQuery = async () =>{
            try {
                const q = query(collection(db, 'blogPosts'), where('category', '==', 'entertainment'), orderBy("views", "desc"), limit(4))
                const querySnapshot = await getDocs(q);
                const formattedPosts = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setQueryContent(formattedPosts)
            } catch (error) {
                console.log(error.message)
            }
        };

        searchQuery()
    }, [])
    
    return (
        <div className="my-5 p-5 rounded-2xl">
            <PostList posts={queryContent} title={'Entertainment'}/>
        </div>
    )
}

export default Entertainment
