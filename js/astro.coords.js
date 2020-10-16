// compute altitude and azimuth
function compute(ra, dec, lat, lon) {
	const now = new Date();
	now.setHours(0, 0);//-(now.getTimezoneOffset() / 60), 0); // => utc 0

  return coord_to_horizon(now, ra, dec, lat, lon);

}

// compute horizon coordinates from ra, dec, lat, lon, and utc
// ra, dec, lat, lon in  degrees
// utc is a Date object
// results returned in hrz_altitude, hrz_azimuth
function coord_to_horizon( utc, ra, dec, lat, lon ) {
    // compute hour angle in degrees
    let ha = mean_sidereal_time( utc, lon ) - ra;
    if (ha < 0) ha = ha + 360;

    // convert degrees to radians
    ha  = ha*Math.PI/180
    dec = dec*Math.PI/180
    lat = lat*Math.PI/180

    // compute altitude in radians
    const sin_alt = Math.sin(dec)*Math.sin(lat) + Math.cos(dec)*Math.cos(lat)*Math.cos(ha);
    const alt = Math.asin(sin_alt);

    // compute azimuth in radians
    // divide by zero error at poles or if alt = 90 deg
    const cos_az = (Math.sin(dec) - Math.sin(alt)*Math.sin(lat))/(Math.cos(alt)*Math.cos(lat));
    const az  = Math.acos(cos_az);

    // convert radians to degrees
    let hrz_altitude = alt*180/Math.PI;
    let hrz_azimuth  = az*180/Math.PI;

    // choose hemisphere
    if (Math.sin(ha) > 0) hrz_azimuth = 360 - hrz_azimuth;

		return [hrz_altitude, hrz_azimuth];
}

// Compute the Mean Sidereal Time in units of degrees.
// Use lon := 0 to get the Greenwich MST.
// East longitudes are positive; West longitudes are negative
// returns: time in degrees
function mean_sidereal_time(now, lon) {
    var year   = now.getUTCFullYear();
    var month  = now.getUTCMonth() + 1;
    var day    = now.getUTCDate();
    var hour   = now.getUTCHours();
    var minute = now.getUTCMinutes();
    var second = now.getUTCSeconds();

    if ((month == 1)||(month == 2))
    {
        year  = year - 1;
        month = month + 12;
    }

    var a = Math.floor(year/100);
    var b = 2 - a + Math.floor(a/4);
    var c = Math.floor(365.25*year);
    var d = Math.floor(30.6001*(month + 1));

    // days since J2000.0
    var jd = b + c + d - 730550.5 + day + (hour + minute/60.0 + second/3600.0)/24.0;

    // julian centuries since J2000.0
    var jt = jd/36525.0;

    // the mean sidereal time in degrees
    var mst = 280.46061837 + 360.98564736629*jd + 0.000387933*jt*jt - jt*jt*jt/38710000 + lon;

    // in degrees modulo 360.0
    if (mst > 0.0)
        while (mst > 360.0) mst = mst - 360.0;
    else
        while (mst < 0.0)   mst = mst + 360.0;

    return mst;
}
