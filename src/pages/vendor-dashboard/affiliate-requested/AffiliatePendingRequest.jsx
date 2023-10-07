import React from 'react';
import { useState } from 'react';
import { useDebounce } from '../../../components/action/useDebounce';
import Pagination from '../../../components/breadcrumbs/Pagination';
import { useEffect } from 'react';
import Aos from 'aos';
import { Helmet } from 'react-helmet';
import Breadcrumb from './own-components/Breadcrumb';
import THead from './own-components/THead';
import Loading from './own-components/Loading';
import TRow from './own-components/TRow';
import { AffiliatePendingRequestProduct } from '../../../api/vendor/apiVendor';
import { NoDataFound } from '../../../components/table/TableComponents';

function AffiliatePendingRequest() {
	const [page, setPage] = useState(null);
	const [search, setSearch] = useState(' ');
	const { searchHandler } = useDebounce(setSearch, setPage);

	const { isLoading, products, refetch } = AffiliatePendingRequestProduct(
		page,
		search
	);

	// loading animation
	useEffect(() => {
		Aos.init({ delay: 400, offset: 50, duration: 300 });
	}, []);

	return (
		<div className="ec-content-wrapper">
			<Helmet>
				<title>Pending Request Product-SOS</title>
			</Helmet>
			<div className="content">
				<Breadcrumb searchHandler={searchHandler} text="Pending" />
				<div data-aos="fade" className="row">
					<div className="col-12">
						<div className="card card-default">
							<div className="card-body">
								<div className="table-responsive">
									<table
										id="responsive-data-table"
										className="table"
										style={{ width: '100%' }}
									>
										<THead />
										{isLoading ? (
											<Loading />
										) : (
											<tbody style={{ verticalAlign: 'middle' }}>
												{products?.data?.length > 0 ? (
													products?.data?.map((e, i) => (
														<TRow
															i={i}
															key={i}
															data={e}
															page={page}
															refetch={refetch}
															isLoading={isLoading}
														/>
													))
												) : (
													<NoDataFound />
												)}
											</tbody>
										)}
									</table>
									<Pagination
										page={page}
										setPage={setPage}
										isLoading={isLoading}
										getPaginationData={products}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AffiliatePendingRequest;
