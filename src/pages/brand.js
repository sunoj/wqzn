import React from 'react'
import { Layout } from '../components/common/layout'
import './brand_source/common.css'
import brandStd from './brand_source/img/std.svg'
import brandDark from './brand_source/img/dark.svg'
import brandGrey from './brand_source/img/grey.svg'
import brandCP1 from './brand_source/img/color_part1.svg'
import brandCP2 from './brand_source/img/color_part2.svg'
import brandCP3 from './brand_source/img/color_part3.svg'
import brandCP4 from './brand_source/img/color_part4.svg'
import DocMetaTitle from '../components/common/DocMetaTitle'

const Brand = ({location}) => {

	return (
		<>
			<DocMetaTitle title="品牌资源" location={location} />
			<Layout location={location}>
				<div className="center mw-xl pl5 pr5 pl10-ns pr10-ns  flex flex-column flex-row-ns justify-start relative">
					<div style={{ margin: '0 auto' }}>
						<header>
							<div className="ch ch_logo container">
								<img alt="brand" src={brandStd} height="110" />
								<h1>品牌徽标使用指南</h1>
							</div>
						</header>
						<div className="main">
							<div className="ch ch_logo container">
								<div className="content clear">
									<div className="card shadow">
										<img alt="brand" src={brandStd} />
										<p>多会浅色 Logo</p>
									</div>
									<div className="card dark shadow">
										<img alt="brand" src={brandDark} />
										<p>多会深色 Logo</p>
									</div>
									<div className="card shadow">
										<img alt="brand" src={brandGrey} />
										<p>多会灰度 Logo</p>
									</div>
								</div>
							</div>
							<div className="ch ch_use container">
								<h2 className="title">多会徽标用法</h2>
								<div className="content clear">
									<div className="left">
										<h3>安全间距</h3>
										<p>无论何时，多会徽标的周围都要留有一定的安全间距，该间距范围内不得出现任何图片和文字。您可以使用图标高度的一半来确定徽标周围的安全间距下限。</p>
									</div>
									<div className="right">
										<span className="border b1"></span>
										<span className="border b2"></span>
										<span className="border b3"></span>
										<span className="border b4"></span>
										<img alt="brand" src={brandStd} />
									</div>
								</div>
							</div>
							<div className="ch ch_color container">
								<h2 className="title">多会品牌颜色</h2>
								<div className="content">
									<table>
										<tbody>
											<tr className="logo">
												<th></th>
												<td>
													<div className="card shadow" style={{width: '98px', height: '98px', padding: '10%'}}>
														<img alt="brand" src={brandCP1} />
													</div>
												</td>
												<td>
													<div className="card shadow" style={{width: '98px', height: '98px', padding: '10%'}}>
														<img alt="brand" src={brandCP2} />
													</div>
												</td>
												<td>
													<div className="card shadow" style={{width: '98px', height: '98px', padding: '10%'}}>
														<img alt="brand" src={brandCP3} />
													</div>
												</td>
												<td>
													<div className="card shadow dark" style={{width: '98px', height: '98px', padding: '10%'}}>
														<img alt="brand" src={brandCP4} />
													</div>
												</td>
											</tr>
											<tr>
												<th>名称</th>
												<td>深蓝色</td>
												<td>浅蓝色</td>
												<td>黑色</td>
												<td>白色</td>
											</tr>
											<tr>
												<th>HEX</th>
												<td>#3A88FD</td>
												<td>#35AFFB</td>
												<td>#282828</td>
												<td>#FFFFFF</td>
											</tr>
											<tr>
												<th>RGB</th>
												<td>58,136,253</td>
												<td>53,175,251</td>
												<td>40,40,40</td>
												<td>255,255,255</td>
											</tr>
											<tr>
												<th>CMYK</th>
												<td>100,23,0,19</td>
												<td>86,18,0,10</td>
												<td>0,0,0,86</td>
												<td>0,0,0,0</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
							<footer>
								<a href="https://qiniu.cdn.duohui.co/duohui_brand_v2.zip" className="btn download_duohui_logo shadow">下载多会徽标</a>
							</footer>
						</div>
					</div>
				</div>
			</Layout>
		</>
	)
}

export default Brand