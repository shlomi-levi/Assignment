ALTER TABLE showtimes
ADD CONSTRAINT no_overlapping_showtimes
EXCLUDE USING gist (
        theater WITH =, tstzrange(start_time, end_time, '[]') WITH &&
    );
