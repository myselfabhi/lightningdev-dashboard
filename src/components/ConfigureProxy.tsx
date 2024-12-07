import React, { useState } from 'react'
import { proxyListCreateResidential } from '../services/apiService'
import toast from 'react-hot-toast'

const ConfigureProxy: React.FC = () => {
	const [tab, setTab] = useState<'auth' | 'whitelist'>('auth')
	const [username] = useState<string>('atjdxdeqzgdrlry100714-zone-resi')
	const [password] = useState<string>('uepsjpxejl')
	const [type, setType] = useState<'rotating' | 'sticky'>('sticky')
	const [sessionTime] = useState<number>(60)
	const [country, setCountry] = useState<string>('Worldwide Mix')
	const [state, setState] = useState<string>('Worldwide Mix')
	const [city, setCity] = useState<string>('Worldwide Mix')
	const [isp, setIsp] = useState<string>('Worldwide Mix')
	const [mode, setMode] = useState<'CountryStateCity' | 'CountryISP'>('CountryStateCity')
	const [whitelistIp, setWhitelistIp] = useState<string>('')
	const [isLoading, setIsLoading] = useState<boolean>(false)

	// Sample dropdown options
	const countryOptions = ['Worldwide Mix', 'United States', 'Germany', 'India']
	const stateOptions = ['Worldwide Mix', 'California', 'Bavaria', 'Karnataka']
	const cityOptions = ['Worldwide Mix', 'San Francisco', 'Munich', 'Bangalore']
	const ispOptions = ['Worldwide Mix', 'Comcast', 'AT&T', 'Vodafone']

	const handleUpdateSettings = async () => {
		setIsLoading(true)
		try {
			const response = await proxyListCreateResidential(
				username,
				password,
				type,
				type === 'sticky' ? sessionTime : undefined,
				country !== 'Worldwide Mix' ? country : undefined,
				mode === 'CountryStateCity' && state !== 'Worldwide Mix' ? state : undefined,
				mode === 'CountryStateCity' && city !== 'Worldwide Mix' ? city : undefined
			)
			toast.success('Settings updated successfully!')
			console.log('Response:', response)
		} catch (error) {
			toast.error('Failed to update proxy settings.')
			console.error('Error:', error)
		} finally {
			setIsLoading(false)
		}
	}

	const handleGenerateAPI = () => {
		toast.success('API generated successfully!')
	}

	const handleAddIp = () => {
		toast.success(`Whitelist IP ${whitelistIp} added successfully!`)
		setWhitelistIp('')
	}

	return (
		<div className="configure-proxy">
			<div className="header d-flex justify-content-between align-items-center mb-4">
				<div>
					<h4>Configure Proxy</h4>
					<p>Configure your proxy type, and whitelist IP</p>
				</div>
				<div className="checkbox-group">
					<label className="form-check-label">
						<input type="radio" name="proxyType" value="rotating" checked={type === 'rotating'} onChange={() => setType('rotating')} className="form-check-input" />
						Rotating
					</label>
					<label className="form-check-label ms-3">
						<input type="radio" name="proxyType" value="sticky" checked={type === 'sticky'} onChange={() => setType('sticky')} className="form-check-input" />
						Sticky
					</label>
				</div>
			</div>

			{/* Tab Switch */}
			<div className="tab-container d-flex">
				<button className={`tab ${tab === 'auth' ? 'active' : ''}`} onClick={() => setTab('auth')}>
					User Auth & Pass
				</button>
				<button className={`tab ${tab === 'whitelist' ? 'active' : ''}`} onClick={() => setTab('whitelist')}>
					Whitelist IP
				</button>
			</div>

			{/* User Auth & Pass Tab */}
			{tab === 'auth' && (
				<div className="auth-form">
					<div className="form-group">
						<label>Username</label>
						<input type="text" value={username} readOnly className="form-control" />
					</div>
					<div className="form-group">
						<label>Password</label>
						<input type="text" value={password} readOnly className="form-control" />
					</div>

					{/* Toggle Buttons */}
					<div className="form-group d-flex gap-3 mb-4">
						<button className={`btn ${mode === 'CountryStateCity' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setMode('CountryStateCity')}>
							Country - State - City
						</button>
						<button className={`btn ${mode === 'CountryISP' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setMode('CountryISP')}>
							Country - ISP
						</button>
					</div>

					{/* Dynamic Fields */}
					{mode === 'CountryStateCity' ? (
						<div className="row">
							<div className="col">
								<label>Country</label>
								<select value={country} onChange={(e) => setCountry(e.target.value)} className="form-control">
									{countryOptions.map((option) => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</select>
							</div>
							<div className="col">
								<label>State</label>
								<select value={state} onChange={(e) => setState(e.target.value)} className="form-control">
									{stateOptions.map((option) => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</select>
							</div>
							<div className="col">
								<label>City</label>
								<select value={city} onChange={(e) => setCity(e.target.value)} className="form-control">
									{cityOptions.map((option) => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</select>
							</div>
						</div>
					) : (
						<div className="row">
							<div className="col">
								<label>Country</label>
								<select value={country} onChange={(e) => setCountry(e.target.value)} className="form-control">
									{countryOptions.map((option) => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</select>
							</div>
							<div className="col">
								<label>ISP</label>
								<select value={isp} onChange={(e) => setIsp(e.target.value)} className="form-control">
									{ispOptions.map((option) => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</select>
							</div>
						</div>
					)}

					{/* Buttons at Bottom */}
					<div className="d-flex justify-content-between align-items-center mt-4">
						<button className="btn btn-primary" onClick={handleGenerateAPI} disabled={isLoading}>
							API Generator &gt;
						</button>
						<button className="btn btn-primary" onClick={handleUpdateSettings} disabled={isLoading}>
							{isLoading ? 'Updating...' : 'Update Settings &gt;'}
						</button>
					</div>
				</div>
			)}

			{/* Whitelist IP Tab */}
			{tab === 'whitelist' && (
				<div className="whitelist-form">
					<div className="form-group">
						<label>Whitelist IP</label>
						<input type="text" value={whitelistIp} onChange={(e) => setWhitelistIp(e.target.value)} placeholder="Enter IP address here" className="form-control" />
						<button className="btn btn-primary full-width mt-2" onClick={handleAddIp}>
							Add &gt;
						</button>
					</div>
					<div className="form-group">
						<label>Country</label>
						<select value={country} onChange={(e) => setCountry(e.target.value)} className="form-control">
							{countryOptions.map((option) => (
								<option key={option} value={option}>
									{option}
								</option>
							))}
						</select>
					</div>
					<button className="btn btn-primary full-width mt-3" onClick={handleUpdateSettings} disabled={isLoading}>
						Update Settings &gt;
					</button>
				</div>
			)}
		</div>
	)
}

export default ConfigureProxy
