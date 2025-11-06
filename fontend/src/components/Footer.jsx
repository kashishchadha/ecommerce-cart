export default function Footer(){
  return (
    <footer className="footer">
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
          <div style={{fontWeight:700}}>Mock E-Com</div>
          <div style={{color:'var(--muted)'}}>© {new Date().getFullYear()} Mock E-Com. All rights reserved.</div>
          <div style={{color:'var(--muted)'}}>Made with care · Support: help@mockecom.test</div>
        </div>
      </div>
    </footer>
  )
}
