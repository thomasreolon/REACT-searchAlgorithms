import React from 'react';




function MobileInfo({children}:{children:JSX.Element}) {
    const [visible, setVisible] = React.useState(true);
    return (
        <>
        {visible && 
            <div style={{
                width:"60vw",
                zIndex:9999,
                position:"absolute",
                top:"20%",
                left:"50%",
                transform:"translate(-50%,-50%)",
                padding: "5vw",
                backgroundColor: "rgba(255,0,255,0.15)",
                borderRadius: "1em",
            }}>
                <div style={{display:"flex", justifyContent:"right", flexDirection:"column"}}>
                    <button 
                        style={{
                            marginLeft:"93%",
                            marginTop:"-4vw",
                            width:"1.2em",
                            fontSize:"1.5em", 
                            borderRadius:"100%", 
                            border:"none",
                            backgroundColor:"rgba(255,255,255,0.4)",
                            color:"white",
                        }}
                        onClick={()=>setVisible(false)}
                        onTouchStart={()=>setVisible(false)}
                    >
                        X
                    </button>
                    {children}
                </div>
            </div>
        }
        </>
    );
}

export default MobileInfo;